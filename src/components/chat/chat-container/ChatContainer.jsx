import { useEffect } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../../features/chat-slice";
// Components
import { Header } from "./header";
import { Messages } from "./messages";
import { Actions } from "./actions";
import { checkOnlineStatus, getConversationId } from "../../../utils/chat";

const ChatContainer = ({ onlineUsers, isTyping }) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
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
        <Header
          isOnline={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        <Messages isTyping={isTyping} />
        <Actions />
      </div>
    </div>
  );
};

export default ChatContainer;
