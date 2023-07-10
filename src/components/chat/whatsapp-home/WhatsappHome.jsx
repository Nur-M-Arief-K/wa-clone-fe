import { Logo } from "../../../svg";

const WhatsappHome = () => {
  return (
    <div className="h-full w-full border-l border-b-[6px] select:none dark:bg-dark_bg_4 dark:border-l-dark_border_2 border-b-green_2">
      <div className="flex flex-col items-center justify-center w-full h-full -mt-1.5 gap-y-8">
        <span>
          <Logo />
        </span>
        <div className="mt-1 space-y-[12px] text-center">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Whatsapp Web
          </h1>
          <p className="text-sm dark:text-dark_text_3">
            Send and receive messages wihout keeping your phone online <br />
            Use Whatsapp on up to 4 linked devices and 1 phone at the same time
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsappHome;
