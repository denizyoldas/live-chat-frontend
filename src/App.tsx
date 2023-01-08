import { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageBox from "./components/message-box";
import { Message } from "./types/message";

// const socket = io("http://localhost:3000");
const socket = io("http://socket.denizaksu.dev");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("msg", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("msg", { message, userId: socket.id });
    setMessage("");
  };

  return (
    <div className="h-screen flex items-center py-10 flex-col gap-3 px-8 md:px-0">
      <h1 className="font-bold text-2xl">Live Chat App</h1>
      <div className="bg-[#D9D9D9] w-full md:w-[730px] h-[560px] rounded-xl">
        <div className="h-full overflow-y-auto p-5">
          {messages.map((msg, i) => (
            <MessageBox
              key={msg.sender}
              message={msg.message}
              timestamp={msg.timestamp}
              isSender={msg.sender === socket.id}
              user={{ id: msg.sender, name: msg.sender }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-lg md:bg-[#D9D9D9] w-full md:w-[730px] flex flex-col md:flex-row justify-between md:px-5 py-3 gap-4">
        <input
          type="text"
          placeholder="Some Text... "
          className="px-3 py-2 rounded-lg w-full ring-2 ring-gray-300 border-none appearance-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          className="bg-[#06C1AB] text-white py-2 px-20 rounded-lg font-bold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
