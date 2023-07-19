import { useEffect } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../../features/chat-slice";
// Components
import { Header } from "./header";
import { Messages } from "./messages";
import { Actions } from "./actions";
import { FilesPreview } from "./previews";
// Utils
import { checkOnlineStatus } from "../../../utils/chat";

const ChatContainer = ({ onlineUsers, isTyping, callUser }) => {
  // React-redux
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const values = {
    token,
    conversationId: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l select-none dark:border-l-dark_border_2 overflow-hidden">
      <div>
        {/* Display conversation profile (group or individual), video call btn, call btn, search btn, and setting btn */}
        <Header
          isOnline={
            activeConversation.isGroup
              ? false
              : checkOnlineStatus(onlineUsers, user, activeConversation.users)
          }
          callUser={callUser}
        />
        {/* Display file(s) preview OR chat and chat actions */}
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            <Messages isTyping={isTyping} />
            <Actions />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
