import { useRef } from "react";
// React-redux
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../../../features/chat-slice";
// Components
import { DocumentIcon } from "../../../../../../../svg";
import { getFileType } from "../../../../../../../utils/file";

const DocumentAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const uploadDocumentHandler = (e) => inputRef.current.click();

  const changeDocumentInputHandler = (e) => {
    const files = Array.from(e.target.files); // FileList object converted into an array so any item type submitted is not matched can be removed easily;

    files.forEach((file, index) => {
      // Filter out not allowed file type and more than 5mb file size
      if (
        (file.type !== "application/pdf" &&
          file.type !== "text/plain" &&
          file.type !== "application/msword" &&
          file.type !==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
          file.type !== "application/vnd.ms-powerpoint" &&
          file.type !==
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
          file.type !== "application/vnd.ms-excel" &&
          file.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
          file.type !== "application/vnd.rar" &&
          file.type !== "application/zip" &&
          file.type !== "audio/mpeg" &&
          file.type !== "audio/wav") ||
        file.size > 1024 * 1024 * 5
      ) {
        return;
      }
      // Read the image and store the image
      else {
        dispatch(
          addFiles({
            file,
            type: getFileType(file.type),
          })
        );
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        className="bg-[#5F66CD] rounded-full"
        onClick={uploadDocumentHandler}
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        multiple
        accept="text/plain, application/pdf, application/msword, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.rar, application/zip, audio/mpeg, audio/wav"
        onChange={changeDocumentInputHandler}
        ref={inputRef}
        hidden
      />
    </li>
  );
};

export default DocumentAttachment;
