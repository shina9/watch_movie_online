import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import axios from "axios";

function CreateComments() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [currentUser] = state.userAPI.currentUser;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState();
  const [token] = state.token;
  const [callback, setCallback] = state.commentsAPI.callback;

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/comment",
        { content: comment, username: currentUser.name, movieID: params.id, rating: rating },
        {
          headers: { Authorization: token },
        }
      );
      setRating("");
      setComment("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div>
      {isLogged ? (
        <div className='create_comment'>
          <form onSubmit={createComment}>
            <h4>Name: {currentUser.name}</h4>
            <label htmlFor='rating'>Rating: </label>
            <select name='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value='1'>1*</option>
              <option value='2'>2*</option>
              <option value='3'>3*</option>
              <option value='4'>4*</option>
              <option value='5'>5*</option>
            </select>
            <textarea
              style={{ marginTop: "10px", fontSize: "15px" }}
              type='text'
              name='comment'
              rows='5'
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
            />
            <Button style={{ marginLeft: "91%" }} variant='contained' color='primary' type='submit'>
              Comment
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
export default CreateComments;
