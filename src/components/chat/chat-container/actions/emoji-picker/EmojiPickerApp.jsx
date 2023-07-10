import { useState, useEffect } from "react";
// Components
import EmojiPicker from "emoji-picker-react";
import { EmojiIcon, CloseIcon } from "../../../../../svg";

const EmojiPickerApp = ({
  textRef,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowAttachments,
}) => {
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const emojiClickHandler = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowAttachments(false);
          setShowEmojiPicker(!showEmojiPicker);
        }}
      >
        {showEmojiPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-[60px] left-[-0.5px] openEmojiAnimation w-full">
          <EmojiPicker theme="dark" onEmojiClick={emojiClickHandler} />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerApp;
