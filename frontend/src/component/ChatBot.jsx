import React, { useState } from 'react';

const ChatBot = () => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendQuery = async () => {
        try {
            // const response = await fetch('/api/chat', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ query })
            // });

            // const data = await response.json();

            setChatHistory([
                ...chatHistory,
                { type: 'user', text: query },
                { type: 'bot', text: "data.summary" }
            ]);
            setQuery('');
        } catch (error) {
            console.error('Query failed', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4 h-96 overflow-y-auto border rounded-lg p-2">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${message.type === 'user'
                            ? 'bg-blue-100 text-right self-end'
                            : 'bg-gray-100 text-left self-start'
                            }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about products or suppliers..."
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendQuery}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;