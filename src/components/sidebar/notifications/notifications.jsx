// Components
import { ArrowIcon, CloseIcon, NotificationIcon } from "../../../svg";

const Notifications = () => {
  return (
    <div className="h-[90px] p-[13px] flex items-center dark:bg-dark_bg_3">
      <div className="w-full flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-x-4">
          <div className="cursor-pointer">
            <NotificationIcon className="dark:fill-blue_1" />
          </div>
          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new messages</span>
            <span className="textSecondary ,t-0.5 flex items-center gap-0.5">
              Turn on desktop Notifications
              <ArrowIcon className="dark:fill-dark_svg_2 mt-1" />
            </span>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="cursor-pointer">
          <CloseIcon className="dark:fill-dark_svg_2" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
