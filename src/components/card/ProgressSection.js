import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import withReducer from "../../store/withReducer";
import { config } from "../../config";
import { fromTimeStamp } from "../../utils/time";
import AppContext from "../../AppContext";
import { FundModal } from "../FundModal";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);


export const ProgressSection = withReducer('ProgressSection', reducer)(props => {
  const dispatch = useDispatch();
  const {epoch} = useContext(AppContext);

  const [investments, setInvestments] = useState(0);
  const crowdfund = useSelector(({blockchain}) => blockchain.crowdfunds.projects.find(p => p.publicKey === props.crowdfund))

  useEffect(() => {
    if (crowdfund && crowdfund.asset && crowdfund.asset.investments) {
      let funds = 0;
      crowdfund.asset.investments.map(i => {
        funds += Number(i.amount);
      });
      setInvestments(funds);
    }
  }, [crowdfund])

  return (
    <div className="flex flex-col w-full mt-4 content-end">
      <div className="w-full flex flex-row space justify-between">
        <div className="flex flex-row">
          <h1>{investments}/</h1>
          <h1
            className="font-bold">{crowdfund && crowdfund.asset && crowdfund.asset.goal && crowdfund.asset.goal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} CFT</h1>
        </div>

        <div>{crowdfund && crowdfund.asset.investments.length} Backers</div>
      </div>
      <div className="mt-2">
        <BorderLinearProgress variant="determinate" value={50}/>
      </div>
      <div className="flex lg:flex-row mt-4">
        <div className="flex flex-row w-full">
          <FundModal publicKey={props.crowdfund} />
          {/*<Button*/}
          {/*  className=""*/}
          {/*  size="small"*/}
          {/*  variant="contained"*/}
          {/*  color="secondary"*/}
          {/*>*/}
          {/*  Follow*/}
          {/*</Button>*/}
        </div>
        <div className="flex flex-row w-full">
          <span className="font-bold p-2 text-right w-full ">
            <AccessTimeIcon
              style={{fontSize: "18px"}}/> Ends {moment(fromTimeStamp(epoch,crowdfund && crowdfund.asset && crowdfund.asset.startFunding + config.periodLength)).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
});
