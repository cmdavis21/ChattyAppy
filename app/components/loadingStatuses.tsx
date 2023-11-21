import { PiWechatLogoDuotone } from "react-icons/pi";
import { BiSolidMessageRoundedError } from "react-icons/bi";

export const Loading = () => {
  return (
    <div className="min-w-screen min-h-screen bg-transparent flex flex-col items-center justify-center">
      <PiWechatLogoDuotone className="text-orange-700 text-[50px] animate-bounce" />
      <h1 className="text-[35px] text-black font-[700] italic">Loading...</h1>
    </div>
  );
};

export const Error = () => {
  return (
    <div className="min-w-screen min-h-screen bg-transparent flex flex-col items-center justify-center">
      <BiSolidMessageRoundedError className="text-orange-700 text-[50px] animate-bounce" />
      <h1 className="text-[35px] text-black font-[700] italic">
        Oh No! There&apos;s a problem...
      </h1>
      <p className="text-[20px] text-gray-700 font-[500] italic">
        We&apos;re working on the problem right away!
      </p>
    </div>
  );
};
