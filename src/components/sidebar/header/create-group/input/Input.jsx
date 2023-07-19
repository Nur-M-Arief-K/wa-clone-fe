import React from "react";

const Input = ({ groupName, setGroupName }) => {
  const searchUsersForGroupHandler = (e) => {
    setGroupName(e.target.value);
  };
  return (
    <div className="mt-4">
      <input
        className="w-full pl-1 border-b border-green_1  outline-none bg-transparent dark:text-dark_text_1"
        type="text"
        placeholder="Name"
        value={groupName}
        onChange={searchUsersForGroupHandler}
      />
    </div>
  );
};

export default Input;
