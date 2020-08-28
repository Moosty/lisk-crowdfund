import { ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";
import React, { useContext, useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "app/store/reducers";
import * as Actions from "app/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { FundTransaction, RegisterTransaction, StartTransaction } from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../../AppContext";
import { getNow, toTimeStamp } from "../../utils";
import { utils } from '@liskhq/lisk-transactions';
const { convertBeddowsToLSK, convertLSKToBeddows } = utils;

export const ConfirmAddCrowdfundModal = withReducer('ConfirmAddCrowdfundModal', reducer)((props) => {
  const dispatch = useDispatch();
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);
  const { open, type, fundraiser } = useSelector(({ modal }) => modal);
  const crowdfund = useSelector(({ blockchain }) => blockchain.crowdfunds.projects.find(c => c.publicKey === props.publicKey || c.publicKey === fundraiser));
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
    signConfirmTx();
  }, [password, passphrase, startDate])

  const signConfirmTx = () => {
    const tx = {
      senderPublicKey: wallet.account.publicKey,
      networkIdentifier,
      nonce: wallet.account.nonce.toString(),
      passphrase: wallet.passphrase,
      asset: {
        goal: convertLSKToBeddows(form.goal.toString()),
        voteTime: form.voting,
        periods: form.periods,
        title: form.title,
        description: form.description,
        site: form.site,
        image: form.image + form.color,
        category: form.category,
        start: toTimeStamp(epoch, form.startDate) > getNow(epoch) ? toTimeStamp(epoch, form.startDate) : getNow(epoch),
      }
    };
    const transaction = new RegisterTransaction(tx);
    transaction.asset.fundraiser = transaction.getPublicKey();
    transaction.nonce = transaction.nonce.toString();
    transaction.sign(networkIdentifier, wallet.passphrase);
    transaction.fee = transaction.minFee.toString();
    setFee(transaction.minFee.toString())
    return transaction;
  }

  const handleConfirm = () => {
    const transaction = signConfirmTx();
    try {
      transaction.sign(networkIdentifier, wallet.passphrase);
      dispatch(Actions.doTransaction(transaction, api));
      dispatch(Actions.closeModal(true));
      dispatch(Actions.clearCrowdfundForm());
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
            dispatch(Actions.openModal('addCrowdFundConfirm'))
          }
        }}
      >
        Create Crowdfund
      </Button>
      <Dialog
        fullWidth
        open={open && type === "addCrowdFundConfirm"}
        onClose={() => dispatch(Actions.closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create crowdfund
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
            Confirm Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
