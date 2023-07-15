import { useState } from "react";
import { Header } from "./header";
import { FileViewer } from "./file-viewer";
import { Input } from "./input";
import { HandleAndSend } from "./handle-and-send";

const FilesPreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full py-2 flex items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <Header activeIndex={activeIndex} />
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          <Input message={message} setMessage={setMessage} />
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
