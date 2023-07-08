import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./conversation";

const Conversations = () => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

  return (
    <div className="conversations scrollbar">
      <ul>
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
