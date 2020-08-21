import React from 'react';
import { StartModal } from "app/components";

export const Start = ({publicKey}) => {

  return (
    <div className="flex flex-col w-full text-center align-middle items-center mt-4">
      <span className="font-bold text-2xl text-teal-800 mt-4" style={{color: "#f50057"}}>
        <StartModal publicKey={publicKey}/>
      </span>
    </div>);
}
