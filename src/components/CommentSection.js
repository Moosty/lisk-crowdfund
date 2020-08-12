import { Avatar, Button, CardHeader, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Update, Comment } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export const CommentSection = (props) => {
  const classes = useStyles();

  return (
    <div className="">
      <div className="fixed top-0 w-full sm:w-9/12 xl:w-2/4 h-40"></div>
      <div className="overflow-auto	flex flex-col justify-end h-screen pb-64 pt-40 noscrollbar">
        <Update
          time="23:00"
          title="Vote"
          content="A moment for Engagement"
          type={"comment"}
        />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className="h-48 rounded-lg bg-white p-4 fex flex-col fixed bottom-0 w-full sm:w-9/12 xl:w-2/4 mb-6">
        <div>
          <form>
            <TextField
              id="outlined-multiline-static"
              label="comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              style={{ marginBottom: 12 }}
            />
          </form>
        </div>
        <div>
          <Button variant="contained">add Comment</Button>
        </div>
      </div>
      ;
    </div>
  );
};
