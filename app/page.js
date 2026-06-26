import "./globals.css";
"use client";
import { useState } from "react";
export default function Chat() {
  const [messages, setMessages] = useState([{ role: "ai", content: "Halo! Ada yang bisa aku bantu?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput(""); setLoading(true);
    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: input }) });
    const data = await res.json();
    setMessages(prev => [...prev, { role: "ai", content: data.reply || "Error: " + data.error }]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gray-100">
      <div className="bg-blue-600 text-white p-4 text-center font-bold text-lg">Gemini Chat</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow ${msg.role === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}`}>{msg.content}</div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow text-gray-500">AI lagi ngetik...</div></div>}
      </div>
      <div className="p-3 bg-white border-t flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ketik pesan..." className="flex-1 border rounded-full px-4 py-2"/>
        <button onClick={sendMessage} disabled={loading} className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold">Kirim</button>
      </div>
    </div>
  );
      }
