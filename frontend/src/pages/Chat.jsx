import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import dp from "../assets/dp.png";
import { useDarkThemeContext } from "../context/DarkTheme";
import { VscDebugRestart } from "react-icons/vsc";

const socket = io("http://localhost:5000");

function App() {
  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { isDark } = useDarkThemeContext();

  useEffect(() => {
    // Join the chat queue when component mounts
    socket.emit("joinChatQueue");

    // Listen for match
    socket.on("matched", ({ partner }) => {
      setPartner(partner);
    });

    // Listen for messages
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // Leave queue when component unmounts (navigating away)
      socket.emit("leaveChatQueue");
      socket.off("matched");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && partner) {
      socket.emit("message", { receiver: partner, message });
      setMessages((prev) => [...prev, { sender: "You", message }]);
      setMessage("");
    }
  };

  return (
    <div className={isDark === "false" ? "flex flex-col items-center bg-white h-screen" : "p-4 flex flex-col items-center bg-white h-screen"}>
      <h1 className="text-center text-red-500">Random Chat</h1>
      {partner ? (
        <>
          <div className="w-screen h-[100%] overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className={msg.sender === "You" ? "text-right border-2 border-red-500" : "border-2 border-black"}>
                  {msg.sender !== "You" ? <img className="h-7 inline" src={dp} alt="" /> : "me"}
                  <p className="inline border border-pink-900">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-black w-screen">
            <button onClick={()=>{window.location.href="/chat"; socket.emit("leaveChatQueue") }} ><VscDebugRestart /></button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-2 border-red-500"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Waiting for a match...</p>
      )}
    </div>
  );
}

export default App;
