import React from "react";
// React-redux
import { useSelector } from "react-redux";
// Components
import { Conversation } from "./conversation";

const Conversations = () => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  return (
    <div className="conversations scrollbar">
      <ul className="mt-[8px]">
        {conversations &&
          conversations
            .filter(
              (conversation) =>
                conversation.latestMessage ||
                conversation._id === activeConversation._id
            )
            .map((conversation) => {
              return (
                <Conversation
                  conversation={conversation}
                  key={conversation._id}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
