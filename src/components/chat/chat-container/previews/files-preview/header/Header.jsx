import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../../../../../features/chat-slice";
import { CloseIcon } from "../../../../../../svg";

const Header = ({ activeIndex }) => {
  const dispatch = useDispatch();
  const { files } = useSelector(state => state.chat )

  const clearFilesHandler = () => dispatch(clearFiles());

  return (
    <div className="w-full pl-4">
      <div className="w-full flex items-center justify-between">
        <div className="translate-x-4 cursor-pointer" onClick={clearFilesHandler}>
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">
            { files[activeIndex]?.file?.name }
        </h1>
        <span></span>
      </div>
    </div>
  );
};

export default Header;
