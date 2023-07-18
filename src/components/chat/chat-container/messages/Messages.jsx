import { useEffect, useRef } from "react";
// React-redux
import { useSelector } from "react-redux";
// Components
import { Message } from "./message";
import { Typing } from "./message/typing";
import { FileMessage } from "./file-message";

const Messages = ({ isTyping }) => {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" }); //scroll to the bottom
  }, [messages, isTyping]);

  return (
    <div className="mb-[16px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358170/untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      <div className="py-2 px-[4%] scrollbar overflow_scrollbar overflow-auto">
        {messages &&
          messages.map((message) => (
            <>
              {/* Message files */}
              {message.files.length > 0 &&
                message.files.map((file) => (
                  <FileMessage
                    fileMessage={file}
                    message={message}
                    key={`f-${message._id}`}
                    me={user._id === message.sender._id}
                  />
                ))}

              {/* Message text */}
              {message.message.length > 0 && (
                <Message
                  message={message}
                  key={`f-${message._id}`}
                  me={user._id === message.sender._id}
                />
              )}
            </>
          ))}
        {isTyping === activeConversation._id && <Typing />}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default Messages;
