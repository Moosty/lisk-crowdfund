import React, { useContext } from 'react';
import moment from "moment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { fromTimeStamp } from "app/utils/time";
import AppContext from "app/AppContext";
import { utils } from '@liskhq/lisk-transactions';
const { convertBeddowsToLSK, convertLSKToBeddows } = utils;

export const NewState = ({goal, start}) => {
  const {epoch} = useContext(AppContext);

  return (
    <div className="flex flex-col w-full text-center align-middle items-center mt-4">
      <StarBorderIcon style={{fontSize: "30px"}}/>
      <span className="font-bold text-2xl text-teal-800 mt-2" style={{color: "#f50057"}}>
        {goal && convertBeddowsToLSK(goal)}CFT
      </span>
      <span className="font-bold w-full ">
        <AccessTimeIcon style={{fontSize: "18px"}}/>{" "}
        Starts {moment(fromTimeStamp(epoch, start)).fromNow()}
      </span>
    </div>);
}
