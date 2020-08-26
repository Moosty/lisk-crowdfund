import React from 'react';
import { RefundModal } from "app/components";

export const Closed = ({state, publicKey, sidebar}) => {

  return <div className="flex flex-col w-full text-center align-middle items-center mt-4">
    {state === 'closed' && <span className="font-bold text-2xl text-teal-800 mt-4" style={{color: "#f50057"}}>
      CLOSED
    </span>}
    {state === "refund" && <RefundModal publicKey={publicKey}/>}
  </div>;
}
