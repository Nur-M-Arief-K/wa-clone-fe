import { BeatLoader } from "react-spinners";
import { TriangleIcon } from "../../../../../../svg";

const Typing = ({ message }) => {
  return (
    <div className="w-full max-w-x5 mt-2 mb-2 flex space-x-3">
      <div>
        <div className="relative h-full p-2 rounded-lg dark:text-dark_text_1 dark:bg-dark_bg_2">
          <BeatLoader color="#fff" size={10} />
          <span>
            <span>
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Typing;
