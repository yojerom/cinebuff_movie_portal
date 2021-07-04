package com.macnell.movieservice.service;

import com.macnell.movieservice.model.Movie;
import com.macnell.movieservice.model.Rating;

import java.util.List;
import java.util.Optional;

public interface RatingService {

    Rating save(Rating rating);

    List<Rating> findById(Integer id);

    /*List<Rating> findByMovie_id(int movie_id);*/
}
