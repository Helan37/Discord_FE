import React, { useState, useEffect } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const fullText = "SSelect a Channel to start chatting!!!";

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < fullText.length-1) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval); 
  }, []);

  return (
    <div className="h-screen flex flex-col  text-white pt-15" >
      <div className="flex flex-row items-center pt-10">
        <img
          className="w-1/3 h-auto p-6"
          src="./images/airobot.png"
          alt="Robot GIF"
        />
        <div className="flex justify-center items-center w-2/3 text-3xl">
          <div className="typing-effect text-white">
            Hii! Welcome to Discord!! <br/><br/>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
