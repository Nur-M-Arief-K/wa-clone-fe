import { useEffect, useContext, useState, useRef } from "react";
// React-redux
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chat-slice";
// React-context
import { SocketContext } from "../contexts/SocketContext";
// Components
import { Sidebar } from "../components/sidebar";
import { ChatContainer, WhatsappHome } from "../components/chat";
import Call from "../components/call/Call";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";
// Misc
import Peer from "simple-peer";

const callData = {
  socketId: "", //my socket id
  receiverSocketId: "", //percobaan supaya gak campur sama socketId yang atas
  receivingCall: false,
  callEnded: false,
  name: "", // conversation partner profile name
  picture: "", // conversation partner profile picture
};

const Home = () => {
  // React-redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // React-context
  const { socket } = useContext(SocketContext);

  // Typing and user online or not
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Call
  const [call, setCall] = useState(callData);
  const [myStream, setMyStream] = useState(); // Store my video and audio call
  const [isCallingOtherUserComponentDisplayed, setIsCallingOtherUserComponentDisplayed] = useState(false);
  const { socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);

  const myVideo = useRef();
  const otherUserVideo = useRef();
  const connectionRef = useRef();

  // Use effect to check user, emit join, and listening on get-online-users
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
    socket.emit("join", user._id);
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Use effect to listening to chat(receive message, typing, and stop typing)
  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    socket.on("typing", (conversationId) => setIsTyping(conversationId));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  // Use effect to listening to call(setup socket, call user,  typing, and stop typing)
  useEffect(() => {
    setupMyMedia(); //PERCOBAAN
    // set socketId prop to MY socketId
    socket.on("setup socket", (socketId) => {
      setCall({ ...call, socketId: socketId });
    });
    // set callData to caller's data
    socket.on("call user", (data) => {
      setCall({
        ...call,
        // socketId: data.from, //Including this socketId ??????????
        receiverSocketId: data.from, //Including this socketId ??????????
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
    socket.on("end call", () => {
      setIsCallingOtherUserComponentDisplayed(false);
      setCall({ ...call, callEnded: true, receivingCall: false });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  const callUser = () => {
    //setupMyMedia(); //PERCOBAAN
    showMyVideoStream();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      otherUserVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    //setupMyMedia();
    showMyVideoStream();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.receiverSocketId });
    });
    peer.on("stream", (stream) => {
      otherUserVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const endCall = () => {
    setIsCallingOtherUserComponentDisplayed(false);
    setCall({ ...call, callEnded: true, receivingCall: false });
    myVideo.current.srcObject = null;
    // socket.emit("end call", call.socketId);
    socket.emit("end call", call.receiverSocketId);
    connectionRef?.current?.destroy();
    // console.log("TRACK CALLED WITH END CALL BTN", myStream.getTracks());
    // const track = myStream.getTracks(); //stop
    // track.forEach(element => {
    //   element.stop();
    // });
    // track.stop();
  };

  const setupMyMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((myStream) => {
        setMyStream(myStream);
      });
  };

  const showMyVideoStream = () => {
    myVideo.current.srcObject = myStream;
    setIsCallingOtherUserComponentDisplayed(true);
  };

  return (
    <div className="h-screen flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden">
      {/* Display main content, sidebar and conversation OR whatsapp home */}
      <div className="container h-screen py-[19px] flex">
        {/* Display user profile, notifications, and conversations list with its latest message */}
        <Sidebar onlineUsers={onlineUsers} isTyping={isTyping} />
        {/* Display active conversation OR whatsapp home */}
        {activeConversation._id ? (
          <ChatContainer
            onlineUsers={onlineUsers}
            isTyping={isTyping}
            callUser={callUser}
          />
        ) : (
          <WhatsappHome />
        )}
      </div>
      {/* Display if conversation partner call */}
      <div className={(isCallingOtherUserComponentDisplayed || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          otherUserVideo={otherUserVideo}
          myStream={myStream}
          answerCall={answerCall}
          endCall={endCall}
          isCallingOtherUserComponentDisplayed={isCallingOtherUserComponentDisplayed}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
    </div>
  );
};

export default Home;
