import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import FeaturedCategory from "../../components/FeaturedCategory";
import PopularWatches from "../../components/PopularWatches";
import ProductCategories from "../../components/ProductCategory";
import useWatchesData from "../../apiservice/useWathes";
import { debounce } from "lodash";

const SkeletonLoader = () => (
  <div className="grid gap-6 mx-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="flex flex-col items-center text-center">
        <div className="w-48 h-48 bg-gray-200 animate-pulse" />
        <div className="w-40 h-4 bg-gray-200 mt-2 animate-pulse" />
        <div className="w-20 h-4 bg-gray-200 mt-2 animate-pulse" />
      </div>
    ))}
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì về đồng hồ hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  // Tạo và lưu trữ sessionId khi component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = "user_" + Date.now();
      localStorage.setItem("chatSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = debounce(async () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setIsLoading(true);

    try {
      console.log("Sending data to backend:", {
        message: input,
        sessionId: sessionId,
      });

      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
        sessionId: sessionId, // Gửi sessionId thay vì pastMessages
      });

      console.log("Response from backend:", response.data);

      const botResponse = response.data.reply;
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error calling backend API:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Xin lỗi, tôi không thể trả lời ngay lúc này. Bạn có thể hỏi thêm về đồng hồ không?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  }, 1000);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-3.582 8-8 8h-2l-4 3v-3H5c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4h14c2.21 0 4 1.79 4 4v4z"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="bg-red-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">T-Five Chatbot</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-2">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                  Đang xử lý...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                placeholder="Hỏi về đồng hồ..."
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-700"
                disabled={isLoading}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const { data, loading } = useWatchesData();

  return (
    <div className="container mt-4 mb-20 mx-auto">
      <Banner />
      <ProductCategories />
      <FeaturedCategory />

      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={data.male} title="ĐỒNG HỒ NAM MỚI NHẤT" />
        </>
      )}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches watches={data.female} title="ĐỒNG HỒ NỮ MỚI NHẤT" />
        </>
      )}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <PopularWatches
            watches={data.couple}
            title="ĐỒNG HỒ CẶP ĐÔI MỚI NHẤT"
          />
        </>
      )}

      <Chatbot />
    </div>
  );
};

export default HomePage;
