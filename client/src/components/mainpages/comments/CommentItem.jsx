import React from "react";
import moment from "moment";
import { Divider, Grid, Paper } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

function CommentItem({ comment }) {
  function countStar(comment) {
    if (comment.rating === 5)
      return (
        <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      );
    if (comment.rating === 4)
      return (
        <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      );
    if (comment.rating === 3)
      return (
        <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      );
    if (comment.rating === 2)
      return (
        <div>
          <StarIcon />
          <StarIcon />
        </div>
      );
    if (comment.rating === 1)
      return (
        <div>
          <StarIcon />
        </div>
      );
  }

  return (
    <div className='comment_card'>
      <Paper style={{ padding: "40px 20px", backgroundColor: "#B8DFD8" }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <div>
              <h4 style={{ textAlign: "left" }}>@{comment.username}: </h4>
              <p style={{ color: "#FC5404", textAlign: "left" }}>{countStar(comment)}</p>
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
