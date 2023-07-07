import React from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chat-slice";
import { ChatContainer, WhatsappHome } from "../components/chat";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  console.log(activeConversation);

  React.useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [user]);

  return (
    <div className="h-screen py-[19px] flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />
        { activeConversation._id ? <ChatContainer /> : <WhatsappHome /> }
      </div>
    </div>
  );
};

export default Home;
