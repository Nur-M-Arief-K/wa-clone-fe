import React from "react";
// React-redux
import { useSelector } from "react-redux";
// Components
import { Conversation } from "./conversation";
import { checkOnlineStatus } from "../../../utils/chat";

const Conversations = ({ onlineUsers, isTyping }) => {
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="conversations scrollbar">
      <ul className="mt-[8px]">
        {conversations &&
          conversations
            .filter(
              (conversation) =>
                // Not return empty conversation
                conversation.latestMessage
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
                  online={check ? true : false}
                  isTyping={ isTyping }
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
