import React from "react";
import ChatHeader from "./chat-header/chat-header";

const ChatContainer = () => {
  return (
    <div className="relative w-full h-full border-l select-none dark:border-l-dark_border_2 overflow-hidden">
        <div>
            <ChatHeader />
        </div>
    </div>
  );
};

export default ChatContainer;
