import { useEffect } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chat-slice";
// Components
import { Sidebar } from "../components/sidebar";
import { ChatContainer, WhatsappHome } from "../components/chat";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
      <div className="container h-screen py-[19px] flex">
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
