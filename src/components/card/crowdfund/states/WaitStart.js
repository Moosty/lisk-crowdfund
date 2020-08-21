import React, { useContext } from 'react';
import moment from "moment";
import { fromTimeStamp } from "app/utils/time";
import AppContext from "app/AppContext";

export const WaitStart = ({start}) => {
  const {epoch} = useContext(AppContext);

  return (
    <div className="flex flex-col w-full text-center align-middle items-center mt-4">
      <span className="font-bold text-2xl text-teal-800 mt-4" style={{color: "#f50057"}}>
        Project funded and starts {moment(fromTimeStamp(epoch, start)).fromNow()}
      </span>
    </div>);
}
