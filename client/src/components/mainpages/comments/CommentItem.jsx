import React from "react";
import moment from "moment";
import { Divider, Grid, Paper } from "@material-ui/core";

function CommentItem({ comment }) {
  return (
    <div className='comment_card'>
      <Paper style={{ padding: "40px 20px", backgroundColor: "#B8DFD8" }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <div>
              <h4 style={{ textAlign: "left" }}>@{comment.username}: </h4>
              <p style={{ color: "red", textAlign: "left" }}> (Rating - {comment.rating})</p>
            </div>

            <p style={{ textAlign: "left" }}>{comment.content}</p>
          </Grid>
          <Grid>
            <div>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <p>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </p>
    </div>
  );
}

export default CommentItem;
