import React, { useReducer } from "react";
import EmojiPickerApp from "./EmojiPickerApp";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chat-slice";
import { ClipLoader } from "react-spinners";

const ChatActions = () => {
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const values = {
    message,
    conversationId: activeConversation._id,
    files: [],
    token,
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMessage(values));
    setMessage("");
  };

  const textRef = React.useRef();

  return (
    <form
      onSubmit={sendMessageHandler}
      className="absolute bottom-0 h-[60px] py-2 px-4 w-full flex items-center select-none dark:bg-dark_bg_2"
    >
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage} />
          <Attachments />
        </ul>
        {/* input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button type="submit" className="btn">
          {status === "loading" ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
