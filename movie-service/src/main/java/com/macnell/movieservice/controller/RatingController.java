package com.macnell.movieservice.controller;

import com.macnell.movieservice.model.Movie;
import com.macnell.movieservice.model.Rating;
import com.macnell.movieservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/RatingService")
public class RatingController {
    @Autowired
    RatingService ratingService;

    //4.update the movie rating by id - failure method
    /*@RequestMapping(value = "/updateRating/{id}" , method = RequestMethod.POST)
    public Movie update(@RequestBody Movie movie,@PathVariable int id)
    {
        movie.setId(id);
        return ratingService.updateRating(movie);
    }*/

    //1.save the rating
    @RequestMapping(value = "/saveRating" , method = RequestMethod.POST)
    public Rating save(@RequestBody Rating rating)
    {
        return ratingService.save(rating);
    }

    //2.fetch ratings by movie id
    @RequestMapping(value = "/fetchRatingsByMovieId/{id}", method = RequestMethod.GET)
    public List<Rating> findbyid(@PathVariable Integer id) {
        return ratingService.findById(id);
    }

    /*//6.fetch ratings by movie id
    @RequestMapping(value = "fetchRating/{id}")
    public List<Rating> fetchRating(@PathVariable int id)
    {
        return ratingService.findByMovie_id(id);
    }*/
}