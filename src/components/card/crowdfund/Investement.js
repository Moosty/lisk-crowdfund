import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { fromTimeStamp } from "app/utils/time";
import CardHeader from "@material-ui/core/CardHeader";

export const Investment = ({user, investment, goal}) => {

  return <CardHeader
    avatar={
      <Avatar aria-label="recipe" className="bg-color-white">
        <img src={`https://avatar.lisk.ws/${user.publicKey}`}/>
      </Avatar>
    }
    title={user.username}
    subheader={`Invested ${investment.amount}CFT\n ${investment.message}`}
  />;
}
