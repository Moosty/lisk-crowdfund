import React, { useContext } from 'react';
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { fromTimeStamp } from "app/utils/time";
import CardHeader from "@material-ui/core/CardHeader";
import AppContext from "app/AppContext";

export const CrowdfundOwner = ({owner, username, start}) => {
  const {epoch} = useContext(AppContext);

  return <CardHeader
    avatar={
      <Avatar aria-label="recipe" className="bg-color-white">
        <img src={`https://avatar.lisk.ws/${owner}`}/>
      </Avatar>
    }
    title={username}
    subheader={moment(fromTimeStamp(epoch, start)).fromNow()}
  />;
}
