import { useState, useContext } from "react";
// React-redux
import { useSelector } from "react-redux";
// React-context
import { SocketContext } from "../../../../../contexts/SocketContext";

const Input = ({ message, setMessage, textRef }) => {
  const [isTyping, setIsTyping] = useState(false);
  // React-redux
  const { activeConversation } = useSelector((state) => state.chat);
  // React-context
  const { socket } = useContext(SocketContext);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    // set to not typing after 5 seconds no typing anyting
    const lastTypingTime = new Date().getTime();
    const timer = 5000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDifference = timeNow - lastTypingTime;
      if(timeDifference >= timer && isTyping) {
        socket.emit("stop typing", activeConversation._id);
        setIsTyping(false)
      }
    }, timer);
  };

  return (
    <div className="w-full ">
      <input
        type="text"
        className="w-full h-[45px] pl-4 flex-1 rounded-lg outline-none dark:bg-dark_hover_1 dark:text-dark_text_1"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  );
};

export default Input;
