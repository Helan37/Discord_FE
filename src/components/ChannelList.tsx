import React from "react";
import { Link } from "react-router-dom";

 function ChannelList(){
    return(
<div className=" h-screen w-60 bg-gray-800 flex flex-col items-center py-4 space-y-4">
       <h1 className="text-white  h-30 shadow-sm text-2xl pb-4 pt-2">Channels</h1>
       <div>
          <Link to="/channel/general" className="text-white mb-2 block">
             # general
           </Link>
           <Link to="/channel/random" className="text-white mb-2 block">
             # random
           </Link>
           <Link to="/channel/tech-talk" className="text-white mb-2 block">
             # tech-talk
            </Link>
        </div>
      </div>
    );
}

export default ChannelList;

