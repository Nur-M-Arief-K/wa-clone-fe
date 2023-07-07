import React from "react";
import ChatHeader from "./chat-header/chat-header";
import ChatMessages from "./messages/chat-messages";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chat-slice";
import { ChatActions } from "./action";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    conversationId: activeConversation?._id,
  };

  React.useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l select-none dark:border-l-dark_border_2 overflow-hidden">
      <div>
        <ChatHeader />
        <ChatMessages />
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
