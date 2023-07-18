import { ArrowIcon, LockIcon, AddContactIcon } from "../../../svg";

const Header = () => {
  return (
    <header className="w-full absolute top-0 z-40">
      {/* Display return btn, end-to-end encrypted text, and add contact btn */}
      <div className="p-1 flex items-center justify-between">
        {/* Display return btn*/}
        <button className="btn">
          <span className="rotate-180 scale-150">
            <ArrowIcon className="fill-white" />
          </span>
        </button>
        {/* Display End-to-end encrypted text*/}
        <p className="flex items-center">
          <LockIcon className="fill-white scale-75" />
          <span className="text-xs text-white">End-to-end Encrypted</span>
        </p>
        {/* Display add contact btn*/}
        <button className="btn">
          <AddContactIcon className="fill-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
