import React from "react";
import EmojiPicker from "./EmojiPicker";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";

const ChatActions = () => {
  return (
    <form className="absolute bottom-0 h-[60px] py-2 px-4 w-full flex items-center select-none dark:bg-dark_bg_2">
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
            <EmojiPicker />
            <Attachments />
        </ul>
        {/* input */}
        <Input />
        <button className="btn">
            <SendIcon className="dark:fill-dark_svg_1" />
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
