import { useState, useContext } from "react";
import { SocketContext } from "../../../../../../contexts/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFiles,
  removeFileFromFiles,
  sendMessage,
} from "../../../../../../features/chat-slice";
import { uploadFiles } from "../../../../../../utils/upload-files";
import { AddFile } from "./add-file";
import { SendIcon, CloseIcon } from "../../../../../../svg";
import { ClipLoader } from "react-spinners";
import VideoThumbnail from "react-video-thumbnail";

const HandleAndSend = ({ activeIndex, setActiveIndex, message }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // upload files first
    const uploadedFiles = await uploadFiles(files);

    // send the message
    const values = {
      token,
      message,
      conversationId: activeConversation._id,
      files: uploadedFiles.length > 0 ? uploadedFiles : [],
    };
    const newMessage = await dispatch(sendMessage(values));
    socket.emit("send message", newMessage.payload);
    await dispatch(clearFiles());
    setLoading(false);
  };
  const removeFileHandler = async (index) => {
    dispatch(removeFileFromFiles(index));
  };

  return (
    <div className="w-[97%] mt-2 border-t flex items-center justify-between dark:border-dark_border_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={`fileThumbnail relative w-14 h-14 mt-2 border rounded-md overflow-hidden cursor-pointer dark:border-white ${
              activeIndex === i ? "border-[3px] !border-green_1" : ""
            }
            `}
            onClick={() => setActiveIndex(i)}
          >
            {file.type === "IMAGE" ? (
              <img
                src={file.imageData}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : file.type === "VIDEO" ? (
              <VideoThumbnail src={file.imageData} videoUrl={file.imageData} />
            ) : (
              <img
                src={`./file-icon/${file.type}.png`}
                alt={`${file.file.name}`}
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
            {/*Remove file icon*/}
            <div
              className="removeFileIcon hidden"
              onClick={() => removeFileHandler(i)}
            >
              <CloseIcon className=" w-4 h-4 absolute right-0 top-0 dark:fill-white " />
            </div>
          </div>
        ))}
        {/* Add another file */}
        <AddFile setActiveIndex={setActiveIndex} />
      </div>
      {/* Send button */}
      <div
        className="w-16 h-16 mt-2 rounded-full flex items-center justify-center bg-green_1 cursor-pointer"
        onClick={sendMessageHandler}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
};

export default HandleAndSend;
