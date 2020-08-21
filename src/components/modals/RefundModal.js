/* global BigInt */
import { ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";
import React, { memo, useContext, useEffect, useState } from "react";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { RefundTransaction } from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../../AppContext";
import { utils } from '@liskhq/lisk-transactions';
import { toTimeStamp } from "../../utils";

const { convertBeddowsToLSK } = utils;

export const RefundModal = memo(withReducer('RefundModal', reducer)((props) => {
  const dispatch = useDispatch();
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const { open, type, fundraiser } = useSelector(({ modal }) => modal);
  const crowdfund = useSelector(({ blockchain }) => blockchain.crowdfunds.projects.find(c => c.publicKey === fundraiser));
  const { wallet } = useSelector(({ blockchain }) => blockchain);
  const [password, setPassword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => {
    if (password) {
      setPassphrase(wallet.username + password + wallet.username);
    }
  }, [password]);

  useEffect(() => {
    if (crowdfund) {
      signRefundTx();
    }
  }, [password, passphrase, startDate, crowdfund])

  useEffect(() => {
          console.log(fundraiser, props.publicKey, crowdfund);
  }, [fundraiser, props.publicKey, crowdfund]);

  const calculateInvestments = investments => {
    let totalInvestments = BigInt(0);
    investments.map(investment => {
      totalInvestments += BigInt(investment.amount);
    });
    return totalInvestments;
  }

  const calculateVoteStake = (investments) => {
    let voteStake = BigInt(0);
    investments.map(investment => {
      if (investment.address === wallet.account.address) {
        voteStake += BigInt(investment.amount);
      }
    });
    const totalInvestments = calculateInvestments(investments);
    return totalInvestments ? voteStake / totalInvestments : BigInt(0);
  }

  const allowedToRefund = (fundraiser) => {
    const payedFiltered = fundraiser.asset.payments
      .filter(p => p.type === 0)
      .map(p => BigInt(p.amount))

    const payedAmount = payedFiltered.length > 0 ? payedFiltered.reduce((accumulator, currentValue) => accumulator + currentValue) : BigInt(0);

    const amountLeft = calculateInvestments(fundraiser.asset.investments) - payedAmount;
    console.log(amountLeft, calculateVoteStake(fundraiser.asset.investments))
    return amountLeft * calculateVoteStake(fundraiser.asset.investments);
  }

  const signRefundTx = () => {
    const tx = {
      senderPublicKey: wallet.account.publicKey,
      networkIdentifier,
      nonce: wallet.account.nonce.toString(),
      passphrase: wallet.passphrase || passphrase,
      asset: {
        fundraiser: fundraiser,
        amount: allowedToRefund(crowdfund).toString(),
      }
    };
    const transaction = new RefundTransaction(tx);
    transaction.nonce = transaction.nonce.toString();
    transaction.sign(networkIdentifier, wallet.passphrase);
    transaction.fee = transaction.minFee.toString();
    setFee(transaction.minFee.toString())
    return transaction;
  }

  const handleConfirm = () => {
    const transaction = signRefundTx();
    try {
      transaction.sign(networkIdentifier, wallet.passphrase);
      dispatch(Actions.doTransaction(transaction, api));
      dispatch(Actions.closeModal(true))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="">
      <Button
        className=" "
        size="small"
        variant="contained"
        color="primary"
        style={{marginRight: 10}}
        onClick={() => {
          if (wallet && wallet.account && wallet.account.address) {
            dispatch(Actions.openModal('refundModal', props.publicKey))
          } else {
            dispatch(Actions.openModal('signin'))
          }
        }}
      >
        Refund investment
      </Button>
      {crowdfund && <Dialog
        fullWidth
        open={open && type === "refundModal"}
        onClose={() => dispatch(Actions.closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Refund investment: `{crowdfund.asset.title}`
        </DialogTitle>
        {/*<MenuCard type="voteItem" title="The Best sunglasses" />*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          {wallet && !wallet.passphrase && <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            variant="outlined"
            fullWidth
          />}
          <div className="flex flex-col mt-2">
            <span className="text-gray-600 text-sm ">
              Transaction Fee:{" "}
              <Tooltip title="The transaction fee is the amount of tokens you will pay to perform this action. It will be paid in the native token.">
                <InfoIcon fontSizeSmall />
              </Tooltip>
            </span>
            <span className="text-red-600 text-sm font-bold">{convertBeddowsToLSK(fee)}CFT</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(Actions.closeModal())} color="primary">
            Cancel
          </Button>
          <Button disabled={!wallet.passphrase && !passphrase} onClick={handleConfirm} color="secondary" >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>}
    </div>
  );
}));
