import React from "react";
// React-redux
import { useSelector } from "react-redux";
// Components
import { Conversation } from "./conversation";
import { checkOnlineStatus } from "../../../utils/chat";

const Conversations = ({ onlineUsers, isTyping }) => {
  const { conversations, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="conversations scrollbar">
      <ul className="mt-[8px]">
        {conversations &&
          conversations
            .filter(
              (conversation) =>
                // Not return empty conversation except for group
                conversation.latestMessage ||
                conversation._id === activeConversation._id ||
                conversation.isGroup === true
            )
            .map((conversation) => {
              const check = checkOnlineStatus(
                onlineUsers,
                user,
                conversation.users
              );
              return (
                <Conversation
                  conversation={conversation}
                  key={conversation._id}
                  online={!conversation.isGroup && check ? true : false}
                  isTyping={isTyping}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
