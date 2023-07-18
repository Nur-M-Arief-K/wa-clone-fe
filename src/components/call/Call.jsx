import React, { useState } from "react";
import { Header } from "./header";
import { Ringing } from "./ringing";
import { CallInformation } from "./call-information";
import { CallActions } from "./call-actions";

const Call = ({
  call,
  setCall,
  callAccepted,
  myVideo,
  otherUserVideo,
  myStream,
  answerCall,
  endCall,
  setTotalSecInCall,
  totalSecInCall,
  isCallingOtherUserComponentDisplayed,
}) => {
  const { receivingCall, callEnded, name } = call;
  const [showCallActions, setShowCallActions] = useState(false);
  const [toggleVideoCallSize, setToggleVideoCallSize] = useState(false);

  const showCallActionsHandler = (e) => setShowCallActions(true);
  const hideCallActionsHandler = (e) => setShowCallActions(false);
  const videoSizeHandler = (e) => setToggleVideoCallSize((prev) => !prev);

  return (
    <>
      {/* Display calling component OR receiving call component */}
      <div
        className={`w-[350px] h-[550px] rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden callbg`}
        hidden={receivingCall && !callAccepted && true}
        onMouseOver={showCallActionsHandler}
        onMouseOut={hideCallActionsHandler}
      >
        <div>
          {/* Display return btn, end-to-end encrypted text, and add contact btn */}
          <Header />
          {/* Display called profile name, ringing... text, and calling time */}
          <CallInformation
            name={name}
            totalSecInCall={totalSecInCall}
            setTotalSecInCall={setTotalSecInCall}
            callAccepted={callAccepted}
          />
          {/* Display video streams of other user and me  */}
          <div>
            {/* Display other user video */}
            {callAccepted && !callEnded && (
              <div>
                <video
                  ref={otherUserVideo}
                  playsInline
                  muted
                  autoPlay
                  className={
                    toggleVideoCallSize ? "SmallVideoCall" : "largeVideoCall"
                  }
                  onClick={videoSizeHandler}
                ></video>
              </div>
            )}
            {/*Display my video*/}
            {myStream && (
              <div>
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${
                    toggleVideoCallSize ? "largeVideoCall" : "SmallVideoCall"
                  } ${showCallActions ? "moveVideoCall" : ""}`}
                  onClick={videoSizeHandler}
                ></video>
              </div>
            )}
          </div>
          {/* Display expand btn, speaker btn, video dial btn, mute btn, cancel call btn */}
          {showCallActions && <CallActions endCall={endCall} />}
          {/* Autoplay calling ringtone when user calling other user(s) */}
          {!callAccepted && isCallingOtherUserComponentDisplayed && (
            <audio src="./audio/ringing.mp3" autoPlay loop></audio>
          )}
        </div>
        {/* Display Ringing component when user gets a call */}
      </div>
      {/* Display ringing */}
      {receivingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
    </>
  );
};

export default Call;
