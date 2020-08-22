import React, { useContext } from "react";
import moment from 'moment';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { withRouter } from 'react-router-dom'

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ProjectImage } from "app/components";
import reducer from "app/store/reducers";
import withReducer from "app/store/withReducer";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { CrowdfundOwner } from "app/components/card/crowdfund";
import { useHistory } from 'react-router-dom';
import { CrowdfundStatus } from "app/components/card/crowdfund/Status";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    margin: 10,
    minWidth: 380,
    flexGrow: 1,
  },
  fullpage: {
    flexGrow: 1,
  },
}));

export const CrowdfundCard = withRouter(withReducer('CrowdfundCard', reducer)(({crowdfund, fullpage}) => {
  const classes = useStyles();
  const history = useHistory();
  const wallet = useSelector(({blockchain}) => blockchain.wallet, isEqual);
  const username = useSelector(({blockchain}) => blockchain.users.users
    .find(u => u.publicKey === crowdfund.asset.owner).username, isEqual);

  return (
    <Card className={fullpage ? classes.fullpage : classes.root}>
      {!fullpage && <CrowdfundOwner username={username} owner={crowdfund.asset.owner} start={crowdfund.asset.startFunding} />}
      {!fullpage && <ProjectImage
        onClick={() => history.push(`/crowdfund/${crowdfund.publicKey}`)}
        height='300px'
        width='100%'
        image={crowdfund.asset.image}
        />}
      <CardContent>
        <Chip
          className="mb-4"
          variant="outlined"
          size="small"
          style={{letterSpacing: 2}}
          color="primary"
          label={crowdfund.asset.category.toUpperCase()}
        />
        <h1 className="font-medium">{crowdfund.asset.title}</h1>
        <Typography variant="body2" color="textSecondary" component="p">
          {crowdfund.asset.description && crowdfund.asset.description.length > 100 ? `${crowdfund.asset.description.substr(0, 100)}...` : crowdfund.asset.description}
        </Typography>
        {fullpage && <CrowdfundOwner username={username} owner={crowdfund.asset.owner} start={crowdfund.asset.startFunding} />}
        <CrowdfundStatus crowdfund={crowdfund} wallet={wallet} fullpage={fullpage}/>
      </CardContent>
    </Card>
  );
}));
