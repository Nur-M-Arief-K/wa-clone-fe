import React from "react";
import { useSelector } from "react-redux";
import Message from "./message";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = React.useRef();

  React.useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" }); //scroll to the bottom
  }, [messages]);

  return (
    <div className="mb-[16px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358170/untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      <div className="py-2 px-[4%] scrollbar overflow_scrollbar overflow-auto">
        {messages &&
          messages.map((message) => (
            <Message
              message={message}
              key={message._id}
              me={user._id === message.sender._id}
            />
          ))}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
