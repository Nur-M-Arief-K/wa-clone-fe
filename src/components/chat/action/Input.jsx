import React from "react";

const Input = ({ message, setMessage }) => {
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  }

  console.log({message})
  
  return (
    <div className="w-full ">
      <input
        type="text"
        className="w-full h-[45px] pl-4 flex-1 rounded-lg outline-none dark:bg-dark_hover_1 dark:text-dark_text_1"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Input;
