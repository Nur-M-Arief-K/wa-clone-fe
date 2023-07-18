import { useState, useEffect } from "react";
import { CloseIcon, ValidIcon } from "../../../svg";

const Ringing = ({ call, setCall, answerCall, endCall }) => {
  const { name, picture } = call;
  
  // After this component displayed and ringing for 30s, set the receivingCall property of call to false to stop it
  const [beingCalledTime, setBeingCalledTime] = useState(0);
  let interval;
  const beingCalledTimeHandler = () => {
    interval = setInterval(() => {
      setBeingCalledTime((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (beingCalledTime <= 30) {
      beingCalledTimeHandler();
    } else {
      setCall({ ...call, receivingCall: false });
    }
    return () => clearInterval(interval);
  }, [beingCalledTime]);

  // Handler
  const answerCallHandler = (e) => answerCall();
  const endCallHandler = (e) => endCall();

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg dark:bg-dark_bg_1 shadow-lg z-30">
      {/*Display caller info(profile picture and name), answer btn, reject btn */}
      <div className="flex items-center justify-between p-4 gap-x-8">
        {/*Display caller profile (picture and name) and text Whatsapp video...*/}
        <div className="flex items-center gap-x-2">
          {/*Display caller profile picture*/}
          <img
            src={picture}
            alt={`caller profile`}
            className="w-28 h-28 rounded-full"
          />
          {/*Display caller profile name and text Whatsapp video...*/}
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>
        {/*Display answer AND reject call btn*/}
        <ul className="flex items-center gap-x-2">
          {/*Display answer btn*/}
          <li onClick={endCallHandler}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          {/*Display reject btn*/}
          <li onClick={answerCallHandler}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/*Autoplay and loop ringtone*/}
      <audio src="./audio/ringtone.mp3" autoPlay loop />
    </div>
  );
};

export default Ringing;
