import moment from "moment";
import { FileImageVideo } from "./file-image-video";
import { FileOthers } from "./file-others";
import { TriangleIcon } from "../../../../../svg";

const FileMessage = ({ fileMessage, message, me }) => {
  const { file, type } = fileMessage;

  return (
    <div
      className={`w-full max-w-xs mt-2 flex space-x-3 ${
        me && "ml-auto justify-end"
      }`}
    >
      <div>
        <div
          className={`relative h-full rounded-lg dark:text-dark_text_1 ${me ? "dark:bg-green_3" : "dark:bg-dark_bg_2"} ${
            me && file.public_id.split(".")[1] === "png"
              ? "bg-white"
              : "bg-green_3 p-1"
          }`}
        >
          <p
            className={`h-full text-sm ${me ? "dark:bg-green_3" : "dark:bg-dark_bg_2"} ${
              type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""
            }`}
          >
            {type === "IMAGE" || type === "VIDEO" ? (
              <FileImageVideo url={file.secure_url} type={type} />
            ) : (
              <FileOthers file={file} type={type} me={me} />
            )}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          <span>
            {!me ? (
              <span>
                <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
              </span>
            ) : (
              <span>
                <TriangleIcon className="dark:fill-green_3 rotate-[60deg] absolute top-[-5px] -right-1.5" />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
