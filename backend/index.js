import axios from "axios";
import * as cheerio from 'cheerio';
import generateEmbedding from "./gemini-embedding.js";
import run from "./gemini-bot.js";
import { ChromaClient } from "chromadb";
import readline from 'node:readline';
import fetchData from "./crawler.js";

const chromaClient = new ChromaClient({ path: "http://localhost:8000" });
await chromaClient.heartbeat();

const WEB_COLLECTION = "WEB_COLLECTION";

async function insertIntoDB({ embedding, url, body = "", head }) {
    if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
        console.error("Invalid embedding format:", embedding);
        return;
    }

    const formattedEmbedding = [embedding];
    const collection = await chromaClient.getOrCreateCollection({ name: WEB_COLLECTION });

    try {
        await collection.add({
            ids: [url],
            embeddings: formattedEmbedding,
            metadatas: [{ url, body, head }]
        });
    } catch (error) {
        console.error("Failed to insert into ChromaDB:", error);
    }
}
async function getHTML(url) {
    const { data } = await axios.get(url);
    return data;
}

async function scrapeWebsite(url) {
    // const data = await getHTML(url);
    const data = await fetchData(url);
    const $ = cheerio.load(data);

    const pageHead = $("head").html();
    const pageBody = $("body").html();
    const bodyData = $("body").text();

    const internalLinks = new Set();
    const externalLinks = new Set();

    $("a").each((_, el) => {
        const link = $(el).attr("href");
        if (link === "/" || link.startsWith("#")) return;
        if (link.startsWith("http") || link.startsWith("https")) {
            externalLinks.add(link);
        } else {
            internalLinks.add(link);
        }
    });

    return { body: pageBody, head: pageHead, internalLinks, externalLinks, data: bodyData.replace(/^\s*\n/gm, "") };
}

async function ingest(url) {
    const { body, head, internalLinks, externalLinks, data } = await scrapeWebsite(url);

    const headEmbedding = await generateEmbedding(head);
    await insertIntoDB({ embedding: headEmbedding, url, body: data, head });


    const bodyEmbedding = await generateEmbedding(data);
    await insertIntoDB({ embedding: bodyEmbedding, url, body: data, head });
}

async function generateVectorEmbeddings(text) {
    try {
        const embedding = await generateEmbedding(text);
        return embedding;
    } catch (error) {
        console.error("Error generating embedding:", error);
        return null;
    }
}

async function chat(question) {
    const questionEmbedding = await generateVectorEmbeddings(question);
    if (!questionEmbedding) {
        console.error("Failed to generate embedding for the question.");
        return;
    }

    const collection = await chromaClient.getOrCreateCollection({ name: WEB_COLLECTION });
    const collectionResult = await collection.query({
        nResults: 5,
        queryEmbeddings: [questionEmbedding]
    });

    const body = collectionResult.metadatas[0].map(e => e.body).filter(e => e.trim() != "" && !!e);

    await run(body, question);
}



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const main = async () => {
    const que = await askQuestion('Ask Question: ');
    await chat(que);

    if (que != "exit") {
        main()
    }
};


ingest("https://www.jainilprajapati.com/");
ingest("https://www.jainilprajapati.com/about");
ingest("https://www.jainilprajapati.com/project");

main();