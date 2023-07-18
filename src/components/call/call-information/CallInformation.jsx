import React from "react";
import { capitalize } from "../../../utils/string";
// Components
import { CallTimes } from "./call-times";

const CallInformation = ({
  name,
  callAccepted,
  totalSecInCall,
  setTotalSecInCall,
}) => {
  return (
    <div className="w-full p-1 absolute top-12 z-40">
      <div className="flex flex-col items-center">
        {/* Display called user's profile name AND ringing text or calling times component */}
        <div className="flex flex-col items-center gap-y-1">
          {/* Display called user's profile name */}
          <h1 className="text-white text-lg">
            <b>{name ? capitalize(name) : ""}</b>
          </h1>
          {/* Display ringing text AND calling times component */}
          {totalSecInCall === 0 && (
            <span className="text-dark_text_1">Ringing...</span>
          )}
          <CallTimes
            callAccepted={callAccepted}
            totalSecInCall={totalSecInCall}
            setTotalSecInCall={setTotalSecInCall}
          />
        </div>
      </div>
    </div>
  );
};

export default CallInformation;
