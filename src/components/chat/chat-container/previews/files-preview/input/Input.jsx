const Input = ({ message, setMessage }) => {
  return (
    <div className="w-full max-w-[60%]  rounded-lg dark:bg-dark_hover_1">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-11 pl-2  bg-transparent dark:text-dark_text_1 focus:outline-none border-none"
      />
    </div>
  );
};

export default Input;
