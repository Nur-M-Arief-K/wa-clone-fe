import { useRef } from "react";
// React-redux
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../../../features/chat-slice";
// Components
import { PhotoIcon } from "../../../../../../../svg";
import { getFileType } from "../../../../../../../utils/file";

const PhotoAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const changeImageInputHandler = (e) => {
    const files = Array.from(e.target.files); // FileList object converted into an array so any item type submitted is not matched can be removed easily;

    files.forEach((file, index) => {
      // Filter out not allowed file type and more than 5mb file size
      if (
        (file.type !== "image/png" &&
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg" &&
          file.type !== "image/webp" &&
          file.type !== "image/gif" &&
          file.type !== "video/mp4" &&
          file.type !== "video/mpeg" &&
          file.type !== "video/webm") ||
        file.size > 1024 * 1024 * 5
      ) {
        return;
      }
      // Read the image and store the image
      else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file,
              imageData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        className="bg-[#BF59CF] rounded-full"
        onClick={() => {
          inputRef.current.click();
        }}
      >
        <PhotoIcon />
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, video/mp4, video/mpeg, video/webm"
          hidden
          ref={inputRef}
          onChange={changeImageInputHandler}
        />
      </button>
    </li>
  );
};

export default PhotoAttachment;
