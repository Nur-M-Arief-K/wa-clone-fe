import { useEffect, useContext, useState } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chat-slice";
// React-context
import { SocketContext } from "../contexts/SocketContext";
// Components
import { Sidebar } from "../components/sidebar";
import { ChatContainer, WhatsappHome } from "../components/chat";

const Home = () => {
  // React-redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  // React-context
  const { socket } = useContext(SocketContext);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
    socket.emit("join", user._id);
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    socket.on("typing", (conversationId) => setIsTyping(conversationId));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  return (
    <div className="h-screen flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
      <div className="container h-screen py-[19px] flex">
        <Sidebar onlineUsers={onlineUsers} isTyping={isTyping} />
        {activeConversation._id ? (
          <ChatContainer onlineUsers={onlineUsers} isTyping={isTyping} />
        ) : (
          <WhatsappHome />
        )}
      </div>
    </div>
  );
};

export default Home;
