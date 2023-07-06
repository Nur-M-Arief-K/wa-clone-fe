import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./conversation";

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className="conversations scrollbar">
      <ul>
        {conversations &&
          conversations.map((conversation) => {
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
