import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React from "react";

import { CrowdfundStepper, ProjectInfo } from "../components";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import withReducer from "../store/withReducer";

//* Modal met Stepper *//
//* Modaladdcrowdfund -> contains Crowdfundstepper -> contains content-steps  *//

const useStyles = makeStyles((theme) => ({
  modal: {
    width: "80%",
    minHeight: "80%",
    minWidth: "80%",
    height: "80%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minHeight: "100%",
    minWidth: "80%",
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  sidewindow: {
    minWidth: "25%",
  },
}));

export const ModalAddCrowdfund = withReducer(
  "ModalAddCrowdfund",
  reducer
)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { wallet } = useSelector(({ blockchain }) => blockchain);
  const { open, type } = useSelector(({ modal }) => modal);
  return (
    <div>
      {wallet.account && wallet.account.address && (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openModal("createCrowdfund"))}
        >
          Create Crowdfund
        </Button>
      )}
      {!wallet.account.address && (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(Actions.openModal("signup"))}
        >
          Create Crowdfund
        </Button>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && type === "createCrowdfund"}
        onClose={() => dispatch(Actions.closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="flex flex-row">
              <div className="flex flex-col w-3/4 max-w-2xl">
                <h1 className="text-xl text-center sm:text-3xl lg:text-5l lg:leading-8 text-grey font-bold my-4">
                  {" "}
                  Create your own Crowdfund
                </h1>
                <CrowdfundStepper />
              </div>
              <div className="max-w-md w-5/12 bg-gray-200 p-4 rounded-t-lg">
                <ProjectInfo create />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
