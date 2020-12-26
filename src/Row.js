import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import "./Row.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(fetchUrl);
    async function fetchData() {
      const request = await axiosInstance.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className='row'>
        <h2>{title}</h2>
        <div className='row_posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${BASE_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
