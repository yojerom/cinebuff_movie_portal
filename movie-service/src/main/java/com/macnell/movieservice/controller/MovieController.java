package com.macnell.movieservice.controller;

import com.macnell.movieservice.model.Movie;
import com.macnell.movieservice.model.Rating;
import com.macnell.movieservice.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/MovieService")
public class MovieController
{
    @Autowired
    MovieService movieService;

    //1.save the movie
    @RequestMapping(value = "/saveMovie" , method = RequestMethod.POST)
    public Movie save(@RequestBody Movie movie)
    {
        return movieService.createMovie(movie);
    }

    //2.fetch movie details by id
    @RequestMapping(value = "fetchTheatre/{id}")
    public Movie fetch(@PathVariable int id)
    {
        return movieService.fetchMovieDetails(id);
    }

    //3.fetch all movies
    @RequestMapping(value = "/fetchAllMovies", method = RequestMethod.GET, produces = "application/json")
    public List<Movie> fetchAll()
    {
        return movieService.fetchAllMovies();
    }

    //4.update the movie details by id
    @RequestMapping(value = "/updateMovie/{id}" , method = RequestMethod.POST)
    public Movie update(@RequestBody Movie movie,@PathVariable int id)
    {
        movie.setId(id);
        return movieService.updateMovie(movie);
    }

    //5.fetch movies by status
    @RequestMapping(value = "/fetchMoviesByStatus/{movieStatus}", method = RequestMethod.GET, produces = "application/json")
    public List<Movie> fetchMoviesByStatus(@PathVariable String movieStatus)
    {
        return movieService.fetchReleasedMovies(movieStatus);
    }

    //6.fetch movies by rating

    //sample by id
    @RequestMapping(value = "fetchMovie/{id}")
    public Optional<Movie> fetchMovie(@PathVariable int id)
    {
        return movieService.findById(id);
    }


}
