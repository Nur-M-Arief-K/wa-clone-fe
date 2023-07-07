import React from "react";
import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import Menu from "./menu";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="h-[50px] p16 flex items-center dark:bg-dark_bg_2">
      <div className="w-full flex items-center justify-between">
        <button className="btn">
          <img
            className="w-full h-full rounded-full object-cover"
            src={user.picture}
            alt="user.name"
          />
        </button>
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setShowMenu(false);
              }
            }}
          >
            <button
              className={`btn ${showMenu && "bg-dark_hover_1"}`}
              onClick={(e) => {
                setShowMenu(!showMenu);
              }}
            >
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {showMenu && <Menu />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
