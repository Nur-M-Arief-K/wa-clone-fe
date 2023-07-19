import moment from "moment";
// Components
import { TriangleIcon } from "../../../../../svg";

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full max-w-xs mt-2 flex space-x-3 ${
        me && "ml-auto justify-end"
      }`}
    >
      {/* Display sender of message profile picture */}
      {!me && (
        <div className="relative">
          <div className="absolute top-0.5 left-[-30px]">
            <img
              className="w-8 h-8 rounded-full"
              src={message.sender.picture}
              alt=""
            />
          </div>
        </div>
      )}
      <div>
        <div
          className={`relative h-full p-2 rounded-lg dark:text-dark_text_1 ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          <p className="h-full float-left text-sm pb-4 pr-8">
            {message.message}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          <span>
            {!me ? (
              <span>
                <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
              </span>
            ) : (
              <span>
                <TriangleIcon className="dark:fill-green_3 rotate-[60deg] absolute top-[-5px] -right-1.5" />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
