import React from 'react';
import { ClaimModal } from "app/components";

export const Claim = ({state, publicKey}) => {

  return <div className="flex flex-col w-full text-center align-middle items-center mt-4">
    {state === "claim" && <ClaimModal publicKey={publicKey}/>}
  </div>;
}
