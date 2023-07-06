import React from "react";
import { dateHandler } from "../../../utils/date";

const Conversation = ({ conversation }) => {
  return (
    <li className="h-[72px] w-full px-[10px] list-none cursor-pointer dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 dark:text-dark_text_1">
      <div className="relative w-full py-[10px] flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-x-3">
          {/* CONVERSATION PICTURE, GROUP PICTURE OR INDIVIDUAL USER PICTURE */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={conversation.picture}
              alt={conversation.name}
            />
          </div>
          {/* CONVERSATION NAME AND MESSAGE */}
          <div className="w-full flex flex-col">
            {/* CONVERSATION NAME */}
            <h1 className="flex items-center gap-x-2 font-bold">
              {conversation.name}
            </h1>
            {/* CONVERSATION MESSAGE */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{conversation.latestMessage?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex flex-col items-end gap-y-4 text-xs">
          <span className="dark:text-dark_text_2">
            {dateHandler(conversation.latestMessage?.createdAt)}
          </span>
        </div>
      </div>
      <span></span>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Conversation;
