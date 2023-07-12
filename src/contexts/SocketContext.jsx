import { createContext } from "react";
// Socket-io
import { io } from "socket.io-client";

const { REACT_APP_SERVER_ENDPOINT } = process.env;

const socket = io(REACT_APP_SERVER_ENDPOINT);

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const value = { socket };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
