// React-redux
import { useSelector } from "react-redux";
// Components
import {
  DotsIcon,
  SearchLargeIcon,
  CallIcon,
  VideoCallIcon,
} from "../../../../svg";
// Utils
import { capitalize } from "../../../../utils/string";

const Header = ({ isOnline, callUser }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;

  const videoCallHandler = (e) => callUser();

  return (
    <div className="h-[59px] p16 flex items-center select-none dark:bg-dark_bg_2">
      <div className="w-full flex items-center justify-between">
        {/* Display conversation profile (group or individual) name, profile picture, and status (online or not)  */}
        <div className="flex items-center gap-x-4">
          {/* Display conversation profile picture */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name}`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* Display conversation name and status (online or not) */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(name)}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {isOnline && "Online"}
            </span>
          </div>
        </div>
        {/* Display video call btn, call btn, search btn, and setting btn */}
        <ul className="flex items-center gap-x-2.5">
          {/* Display video call btn */}
          <li onClick={videoCallHandler}>
            <button className="btn">
              <VideoCallIcon className="dark:fill-dark_svg_1 dark:stroke-dark_svg_1  scale-[65%]" />
            </button>
          </li>
          {/* Display call btn */}
          <li>
            <button className="btn">
              <CallIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          {/* Display search btn */}
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          {/* Display setting btn */}
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
