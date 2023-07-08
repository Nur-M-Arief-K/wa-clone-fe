import React from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowEmojiPicker,
}) => {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShowEmojiPicker(false);
          setShowAttachments((prev) => !prev);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showAttachments && <Menu />}
    </li>
  );
};

export default Attachments;
