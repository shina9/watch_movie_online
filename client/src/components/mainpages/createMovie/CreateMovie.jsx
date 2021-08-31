import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

const initialState = {
  title: "",
  description: "",
  content: "",
  category: "",
  _id: "",
};

function CreateMovie() {
  const state = useContext(GlobalState);
  const [movie, setMovie] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const param = useParams();

  const [movies] = state.moviesAPI.movies;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.moviesAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      movies.forEach((movie) => {
        if (movie._id === param.id) {
          setMovie(movie);
          setImages(movie.images);
        }
      });
    } else {
      setOnEdit(false);
      setMovie(initialState);
      setImages(false);
    }
  }, [param.id, movies]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: { "content-type": "multipart/form-data", Authorization: token },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        const res = await axios.put(
          `/api/movies/${movie._id}`,
          { ...movie, images },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/movies",
          { ...movie, images },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className='create_movie'>
      <div className='upload'>
        <h3 style={{ color: "red" }}>Upload Image Here:</h3>
        <input type='file' name='file' id='file_up' onChange={handleUpload} />
        {loading ? (
          <div id='file_img'>
            <Loading />
          </div>
        ) : (
          <div id='file_img' style={styleUpload}>
            <img src={images ? images.url : ""} alt='' />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' required value={movie.title} onChange={handleChangeInput} />
        </div>

        <div className='row'>
          <label htmlFor='categories'>Categories: </label>
          <select name='category' value={movie.category} onChange={handleChangeInput}>
            <option value=''>Select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='row'>
          <label htmlFor='content'>URL</label>
          <input
            type='text'
            name='content'
            id='content'
            required
            value={movie.content}
            rows='3'
            onChange={handleChangeInput}
            placeholder='Link Youtube'
          />
        </div>

        <div className='row'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            required
            value={movie.description}
            rows='12'
            onChange={handleChangeInput}
          />
        </div>

        <Button variant='contained' color='primary' size='large' type='submit'>
          {onEdit ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}

export default CreateMovie;
