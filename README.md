# 🚀 AI-Powered Chatbot with ChromaDB & Gemini AI

This project is a **React-based chatbot** that leverages **Google Gemini AI** for generating responses and **ChromaDB** for vector-based search, enabling intelligent and context-aware responses.

---

## 📌 Features
- **AI-Powered Chatbot** using **Gemini AI** for natural language responses
- **Web Scraping** with **Cheerio & Axios** to retrieve page content
- **Vector Embeddings** generated via **Google Generative AI**
- **ChromaDB Integration** for storing and querying embeddings
- **REST API Backend** built with **Node.js & Express**

---

## 🛠 Tech Stack
### Frontend:
- **React.js**
- **Tailwind CSS** (optional for styling)

### Backend:
- **Node.js** & **Express.js**
- **Google Generative AI SDK** (`@google/generative-ai`)
- **ChromaDB** for vector-based search
- **Axios & Cheerio** for web scraping
- **Dotenv** for environment variables

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Kishan931644/chatbot.git
cd chatbot
```

### 2️⃣ Install Dependencies
```sh
cd backend
npm install
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
GEMINI_API_KEY=your_google_api_key
CHROMA_DB_PATH=http://localhost:8000
```

### 4️⃣ Start ChromaDB (Docker Required)
```sh
cd backend
docker compose up
```

### 5️⃣ Run the Backend
```sh
cd backend
npm run dev
```

### 6️⃣ Run the Frontend
```sh
cd frontend  
npm start
```

---

## 📜 Usage
1. Start the chatbot and enter a question.
2. The system will:
   - Fetch the relevant webpage content
   - Generate vector embeddings
   - Query ChromaDB for relevant context
   - Send context + query to Gemini AI for response
3. Receive an AI-generated answer in real-time.

---

## 📂 Project Structure
```
📦 project-root
├── backend
│   ├── index.js            # Main backend server
│   ├── gemini-bot.js       # Chatbot logic with Gemini AI
│   ├── gemini-embedding.js # Handles vector embeddings
│   ├── .env                # Environment variables
│   ├── docker-compose.yml       # ChromaDB setup (optional)
├── frontend
│   ├── src
│   │   ├── App.js          # Main React component
│   │   ├──Components
│   |   │   ├── Chatbot.js      # Chat UI Component
│   ├── package.json        # Frontend dependencies
├── README.md
└── package.json            # Backend dependencies

```

---



## 🎯 Future Enhancements
- ✅ Improve embedding storage optimization
- ✅ Implement more advanced AI response tuning
- ✅ Add support for multiple document sources
- ✅ Improve frontend UI/UX for chatbot

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## 🤝 Contributing
Pull requests are welcome! If you'd like to contribute, please fork the repository and submit a PR.

### **Author:**
- **Kishan Rathod** - [GitHub](https://github.com/Kishan931644)

Happy coding! 🚀

