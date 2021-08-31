import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import MovieItem from "../utils/movieItem/MovieItem";
import CreateComments from "../comments/CreateComments";
import CommentItem from "../comments/CommentItem";
import { Button } from "@material-ui/core";
import axios from "axios";

function DetailMovie() {
  const params = useParams();
  const state = useContext(GlobalState);

  const [comments] = state.commentsAPI.comments;
  const [callback, setCallback] = state.commentsAPI.callback;
  const [token] = state.token;

  const [currentUser] = state.userAPI.currentUser;
  const [rating, setRating] = useState(0);
  const [movies] = state.moviesAPI.movies;
  const [detailMovie, setDetailMovie] = useState([]);

  useEffect(() => {
    if (params.id) {
      movies.forEach((movie) => {
        if (movie._id === params.id) setDetailMovie(movie);
      });
    }
  }, [params.id, movies]);

  if (detailMovie.length === 0) return null;

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(`/api/comment/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  return (
    <>
      <div className='detail'>
        <img src={detailMovie.images.url} alt='' />
        <div className='box-detail'>
          <div className='row'>
            <h3>{detailMovie.title}</h3>
          </div>
          <p>{detailMovie.description}</p>
        </div>
      </div>
      <div>
        <iframe width='1190' height='500' src={detailMovie.content} allowFullScreen></iframe>
      </div>
      <div class='fb-share-button' data-href={document.URL} data-layout='button_count'></div>
      <div style={{ marginTop: "100px" }}>
        <h1 style={{ textAlign: "center" }}>Comments</h1>
        <p>
          <CreateComments />
        </p>
        {comments.map((comment) => {
          if (comment.movieID === params.id) {
            return (
              <div>
                <CommentItem comment={comment} />
                {comment.username === currentUser.name ? (
                  <div>
                    <Button
                      style={{ marginLeft: "93%" }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deleteComment(comment._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          } else return null;
        })}
      </div>

      <div style={{ marginTop: "100px" }}>
        <h2>Related movies</h2>
        <div className='movies'>
          {movies.map((movie) => {
            if (movie.category === detailMovie.category && movie._id !== detailMovie._id) {
              return <MovieItem key={movie._id} movie={movie} />;
            } else return null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailMovie;
