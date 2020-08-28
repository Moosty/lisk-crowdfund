import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import reducer from 'app/store/reducers';
import withReducer from "app/store/withReducer";
import { config } from "app/config";
import { fromTimeStamp } from "app/utils/time";
import AppContext from "../../AppContext";
import { FundModal } from "../modals/FundModal";
import { utils } from '@liskhq/lisk-transactions';
const { convertBeddowsToLSK, convertLSKToBeddows } = utils;

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
          <h1>{investments && convertBeddowsToLSK(investments.toString())}/</h1>
          <h1
            className="font-bold">{crowdfund && crowdfund.asset && crowdfund.asset.goal && convertBeddowsToLSK(crowdfund.asset.goal)} CFT</h1>
        </div>

        <div>{crowdfund && crowdfund.asset.investments.length} Backers</div>
      </div>
      <div className="mt-2">
        <BorderLinearProgress variant="determinate" value={investments && (investments / Number(crowdfund.asset.goal) )* 100}/>
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
