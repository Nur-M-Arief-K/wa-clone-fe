// React-redux
import { useDispatch, useSelector } from "react-redux";
import { openCreateConversation } from "../../../../features/chat-slice";

const Contact = ({ contact, setSearchResults }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    receiverId: contact._id,
    token: token,
  };
  const openConversation = async (e) => {
    await dispatch(openCreateConversation(values));
    setSearchResults([]);
  };

  return (
    <li onClick={openConversation} className="list-none h-[72px] px-[10px] cursor-pointer hover:dark:bg-dark_bg_2 dark:text-dark_text_1">
      <div className="py-[10px] flex items-center gap-x-3">
        <div className="flex items-center gap-x-3">
          {/* CONVERSATION PICTURE, GROUP PICTURE OR INDIVIDUAL USER PICTURE */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={contact.picture}
              alt={contact.name}
            />
          </div>
          {/* CONVERSATION NAME AND MESSAGE */}
          <div className="w-full flex flex-col">
            {/* CONVERSATION NAME */}
            <h1 className="flex items-center gap-x-2 font-bold">
              {contact.name}
            </h1>
            {/* CONVERSATION MESSAGE */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.latestMessage?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Contact;
