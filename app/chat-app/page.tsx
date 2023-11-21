"use client";
import { FiSend } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { io } from "socket.io-client";
import AppHeaderAndMenu from "../components/headerAndMenu";
import Image from "next/image";
import { useGifhyData } from "./gifhyAxiosClient";
import { Error, Loading } from "../components/loadingStatuses";

const ChattyAppy = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [gifIconClicked, setGifIconClicked] = useState(false);

  // create a socket.io server connection to server port
  const socket = io("http://localhost:3003");

  useEffect(() => {
    const chatArea = document.getElementById("chat-area");

    const createNewTextBubble = (value: string) => {
      const messageBubble = document.createElement("div");
      messageBubble.style.marginTop = "15px";
      messageBubble.style.padding = "12px";
      messageBubble.style.color = "#923824";
      messageBubble.style.borderColor = "black";
      messageBubble.style.borderWidth = "1px";
      messageBubble.style.borderRadius = "9999px";
      messageBubble.style.width = "fit-content";
      messageBubble.style.fontSize = "18px";
      messageBubble.innerHTML = `${value}`;
      chatArea?.append(messageBubble);
    };

    socket.on("connect", () => {
      console.log(`Socket is connected`);
    });

    // listen from server sending messages
    socket.on("message", (message) => {
      createNewTextBubble(message);
    });

    socket.on("disconnect", () => {
      console.log(`Socket is disconnected.`);
    });
  }, [socket]);

  // client sending messages to the server
  const sendMessage: React.FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // send to server
    socket.emit("message", currentMessage);
    console.log(`Sending message: "${currentMessage}"`);

    setCurrentMessage("");
  };

  // gifhy react query
  const { data, isLoading, error } = useGifhyData();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(`${error?.message}`);
    return <Error />;
  }

  return (
    <main className="relative min-w-screen min-h-screen overflow-x-hidden mx-auto">
      <AppHeaderAndMenu />

      <div className="w-full px-[10px] md:px-[80px] lg:px-[100px] z-5">
        <div id="chat-area" className="w-full max-h-[100%] overflow-y-scroll">
          {/* display stored message */}
        </div>

        {/* input area */}
        <div className="w-full fixed bottom-[40px] flex items-center gap-x-4">
          {/* gifhy icon and box */}
          <button
            onClick={() => setGifIconClicked((click) => !click)}
            className="rounded-full h-[45px] px-[15px] text-orange-900 hover:bg-orange-900 hover:text-white"
          >
            <MdOutlineGifBox className="text-[40px]" />
          </button>

          <div
            className={` ${
              gifIconClicked ? "block" : "hidden"
            } absolute bottom-[80px] w-[400px] h-[300px] p-5 rounded-lg shadow-xl`}
          >
            <p className="text-gray-700 mb-4 border-[1px] border-x-0 border-t-0 border-b-gray-300">
              Trendy Gifs...
            </p>
            <Suspense fallback={<Loading />}>
              <div className="w-full h-[200px] grid grid-cols-3 gap-3 overflow-y-scroll">
                {data?.map((gif: string, index: number) => (
                  <div key={index} className="w-[100px] h-[100px]">
                    <Image
                      src={gif}
                      alt=""
                      width={0}
                      height={0}
                      onClick={() => setCurrentMessage(gif)}
                      className="w-[100px] h-[100px] hover:shadow-xl hover:rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </Suspense>
          </div>

          <form
            onSubmit={(e) => sendMessage(e)}
            className="w-full flex gap-x-4"
          >
            <input
              type="text"
              autoFocus
              multiple
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="What's happenin'..."
              className="w-[60%] text-black border-[2px] border-orange-900 min-h-[45px] pl-[15px] rounded-full focus:ring-gray-700 active:border-gray-700"
            />
            <button className="rounded-full h-[45px] px-[15px] text-orange-900 text-center bg-transparent border-[2px] border-orange-900 hover:bg-orange-900 hover:text-white">
              <FiSend className="text-[20px]" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChattyAppy;
