package com.macnell.movieservice.service;

import com.macnell.movieservice.model.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    //1.save the movie
    Movie createMovie(Movie movie);

    //2.fetch movie details by id
    Movie fetchMovieDetails(int id);

    //3.fetch all movies
    List<Movie> fetchAllMovies();

    //4.update the movie details by id
    Movie updateMovie(Movie movie);

    Optional<Movie> findById(int id);

    List<Movie> fetchReleasedMovies(String movieStatus);
}
