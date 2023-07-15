import { useSelector } from "react-redux";

const FileViewer = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);

  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {files[activeIndex].type === "IMAGE" ? (
          <img
            src={files[activeIndex].imageData}
            alt={files[activeIndex].file.name}
            className="hview max-w-[80%] object-contain"
          />
        ) : files[activeIndex].type === "VIDEO" ? (
          <video
            src={files[activeIndex].imageData}
            className="hview max-w-[80%] object-contain"
            controls
          />
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            {/* file icon */}
            <img
              src={`./file-icon/${files[activeIndex].type}.png`}
              alt={`${files[activeIndex].file.name}`}
            />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_3">
              {files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
