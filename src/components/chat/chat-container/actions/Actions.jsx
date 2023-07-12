import { useState, useRef, useContext } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../../features/chat-slice";
// React-component
import { SocketContext } from "../../../../contexts/SocketContext";
// Components
import { EmojiPickerApp } from "./emoji-picker";
import { Attachments } from "./attachments";
import { Input } from "./input";
import { SendIcon } from "../../../../svg";
import { ClipLoader } from "react-spinners";

const Actions = () => {
  // React-redux
  const dispatch = useDispatch();
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  // React-context
  const { socket } = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const values = {
    message,
    conversationId: activeConversation._id,
    files: [],
    token,
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = await dispatch(sendMessage(values));
    socket.emit("send message", newMessage.payload);
    setMessage("");
    setLoading(false);
  };

  const textRef = useRef();

  return (
    <form
      onSubmit={sendMessageHandler}
      className="absolute bottom-0 h-[60px] py-2 px-4 w-full flex items-center select-none dark:bg-dark_bg_2"
    >
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowEmojiPicker={setShowEmojiPicker}
          />
        </ul>
        {/* input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default Actions;
