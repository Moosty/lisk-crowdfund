import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React, { useEffect } from "react";

import { DemoInfo } from "../index";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";

const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: "50rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const DemoInfoModal = withReducer(
  "DemoInfoModal",
  reducer
)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, type } = useSelector(({ modal }) => modal);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && type === "DemoInfoModal"}
        onClose={() => dispatch(Actions.closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="w-full sm:w-9/12 xl:w-2/4 ">
            <DemoInfo
              title="The Lisk Crowd Project - Built with the Lisk SDK!"
              tag="LISK BLOCKCHAIN APPLICATIONS"
              description="Read more about Lisk, the LiskCrowd project, the technology, the community and other applications:"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
