import React, { memo, useState } from 'react';
import { Investment } from "app/components/card/crowdfund/Investement";
import { useSelector } from "react-redux";
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { isEqual } from "lodash";
import IconButton from "@material-ui/core/IconButton";

export const Investments = memo(({crowdfund, type, defaultOpen = false, address}) => {
  const {users} = useSelector(({blockchain}) => blockchain.users, isEqual);
  const [open, setOpen] = useState(defaultOpen);
  return <div>
    <div className="flex flex-row border-t mt-4 pt-3">
      <div className="text-lg text-gray-700">
        {address ? 'My Investments' : 'All investments'}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}
        </IconButton>
      </div>
    </div>
    {!address && open && crowdfund && crowdfund.asset && crowdfund.asset.investments && crowdfund.asset.investments.map(investment => {
      return (
        <Investment
          goal={crowdfund.asset.goal}
          user={users.find(u => u.address === investment.address)}
          investment={investment}
        />
      )
    })}
    {address && open && crowdfund && crowdfund.asset && crowdfund.asset.investments && crowdfund.asset.investments.filter(i => i.address === address).map(investment => {
      return (
        <Investment
          goal={crowdfund.asset.goal}
          user={users.find(u => u.address === investment.address)}
          investment={investment}
        />
      )
    })}

  </div>;
});
