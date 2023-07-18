import { ArrowIcon, SpeakerIcon, VideoDialIcon, MuteIcon, DialIcon } from "../../../svg";

const CallActions = ({ endCall }) => {
  const cancelCallHandler = (e) => endCall();
  
  return (
    <div className="h-22 w-full absolute bottom-0 z-40 px-1">
      {/* Display expand btn, speaker btn, video dial btn, mute btn, cancel call btn */}
      <div className="relative px-4 pt-6 pb-12 rounded-xl bg-[#222]">
        {/* Display expand icon*/}
        <button className="-rotate-90 scale-y-[300%] absolute top-1 left-1/2">
          <ArrowIcon className="fill-dark_svg_2" />
        </button>
        {/* Display speaker btn, video dial btn, mute btn, cancel call btn */}
        <ul className="flex items-center justify-between">
        {/* Display speaker btn */}
          <li>
            <button className="btn_secondary">
              <SpeakerIcon className="fill-white w-6" />
            </button>
          </li>
          {/* Display video dial btn */}
          <li>
            <button className="btn_secondary">
              <VideoDialIcon className="fill-white w-14 mt-2.5" />
            </button>
          </li>
          {/* Display mute btn */}
          <li>
            <button className="btn_secondary">
              <MuteIcon className="fill-white w-5" />
            </button>
          </li>
          {/* Display cancel call btn */}
          <li onClick={cancelCallHandler}>
            <button className="btn_secondary bg-red-600 rotate-[135deg]">
              <DialIcon className="fill-white w-6" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallActions;
