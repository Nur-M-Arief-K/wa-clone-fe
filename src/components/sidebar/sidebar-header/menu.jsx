import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/user-slice";

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div
      tabIndex="0"
      className="absolute right-1 z-50 w-52 shadow-md dark:bg-dark_bg_2 dark:text-dark_text_1"
    >
      <ul>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Starred messages</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Settings</span>
        </li>
        <li
          onClick={() => dispatch(logout())}
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
