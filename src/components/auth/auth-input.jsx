import React from "react";

const AuthInput = ({ name, type, placeholder, register, error }) => {
  return (
    <div className="mt-8 content-center space-y-1 dark:text-dark_text_1">
      <label htmlFor="name" className="text-sm font-bold tracking-wide" >{placeholder}</label>
      <input className="w-full py-2 px-4 rounded-lg outline-none text-base dark:bg-dark_bg_3" type={type} placeholder={placeholder} {...register(name)} />
      { error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default AuthInput;
