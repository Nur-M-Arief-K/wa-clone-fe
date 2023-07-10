import { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setReadablePicture,
  setPicture,
}) {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/jpg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`Format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`File is too large, maximum size is 5mb`);
      return;
    } else {
      setError("");
      setPicture(pic);
      //reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 space-y-1 content-center dark:text-dark_text_1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="user profile pic"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="flex items-center justify-center w-20 py-1 mt-2 rounded-md text-xs font-bold cursor-pointer dark:bg-dark_bg_3"
            onClick={() => handleChangePic()}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-full h-12 rounded-md font-bold cursor-pointer dark:bg-dark_bg_3"
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg, image/jpg, image/webp"
        onChange={handlePicture}
      />
      {error && (
        <div className="mt-2">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
