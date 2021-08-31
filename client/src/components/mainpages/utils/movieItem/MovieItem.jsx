import React from "react";
import BtnRender from "./BtnRender";

function MovieItem({ movie, isAdmin, deleteMovie, handleCheck }) {
  return (
    <div className='movie_card'>
      {isAdmin && <input type='checkbox' checked={movie.checked} onChange={() => handleCheck(movie._id)} />}
      <img src={movie.images.url} alt='' />

      <div className='movie_box'>
        <h2 title={movie.title}>{movie.title}</h2>
      </div>

      <BtnRender movie={movie} deleteMovie={deleteMovie} />
    </div>
  );
}

export default MovieItem;
