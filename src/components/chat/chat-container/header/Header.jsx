// React-redux
import { useSelector } from "react-redux";
// Utils
import { capitalize } from "../../../../utils/string";
// Components
import { DotsIcon, SearchLargeIcon } from "../../../../svg";

const Header = ({ isOnline }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="h-[59px] p16 flex items-center select-none dark:bg-dark_bg_2">
      <div className="w-full flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={picture}
              alt={`${name}`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(name)}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">{isOnline && "Online" }</span>
          </div>
        </div>
        {/* RIGHT */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
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
