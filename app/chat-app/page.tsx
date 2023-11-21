"use client";
import { FiSend } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import React, { useState, useEffect, FormEvent } from "react";
import { io } from "socket.io-client";
import AppHeaderAndMenu from "../components/headerAndMenu";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ChattyAppy = ({ gifhyStickersProp }: { gifhyStickersProp: string[] }) => {
  const [currentMessage, setCurrentMessage] = useState("");

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
  const { data, isLoading, error } = useQuery({
    queryKey: ["gif"],
    queryFn: () => gifhyStickersProp,
  });

  if (isLoading) {
    return "Laoding Gifs...";
  }

  if (error) {
    return `Error fetching gifs: ${error.message}`;
  }

  return (
    <main className="relative min-w-screen min-h-screen overflow-x-hidden mx-auto bg-gradient-to-r from-[#fffafa] from-10% via-[#fefefa] to-[#fffafa]">
      <AppHeaderAndMenu />

      <div className="w-full px-[10px] md:px-[80px] lg:px-[100px] z-5">
        {/* display stored message */}
        <div
          id="chat-area"
          className="w-[50%] max-h-[100%] overflow-y-scroll"
        ></div>

        {/* input form area */}
        <div className="w-full fixed  bottom-[30px] flex items-center">
          <MdOutlineGifBox className="mr-[8px] md:mr-[20px] text-[40px] text-orange-900" />

          <div className="w-[700px] h-[500px] p-5">
            <p className="text-gray-700 border-[1px] border-b-gray-700">
              Trendy Gifs...
            </p>

            {data?.map((gif: string, index: number) => (
              <div key={index} className="w-[200px] h-[200px]">
                <Image src={gif} alt="" width={200} height={200} />
              </div>
            ))}
          </div>

          <form onSubmit={(e) => sendMessage(e)}>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="What's happenin'..."
              className="w-[60%] text-black border-[2px] border-orange-900 h-[45px] pl-[15px] rounded-full focus:ring-gray-700 active:border-gray-700"
            />
            <button className="rounded-full h-[45px] px-[15px] ml-[8px] md:ml-[20px] text-orange-900 text-center bg-transparent border-[2px] border-orange-900 hover:bg-orange-900 hover:text-white">
              <FiSend size={22} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChattyAppy;
