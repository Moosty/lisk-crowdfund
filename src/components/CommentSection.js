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
    <div>
      <div className="">
        <Update
          time="23:00"
          title="Vote"
          content="A moment for Engagement"
          type={"comment"}
        />
      </div>
      <Comment />
      <div className="rounded-lg bg-white w-full p-4 fex flex-col">
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
