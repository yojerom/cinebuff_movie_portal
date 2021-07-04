package com.macnell.movieservice.service;

import com.macnell.movieservice.model.Movie;
import com.macnell.movieservice.model.Rating;
import com.macnell.movieservice.repository.MovieRepository;
import com.macnell.movieservice.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    RatingRepository ratingRepository;

    //4.update the movie rating by id
    /*@Override
    public Movie updateRating(Movie movie) {
        Optional<Movie> movieList = movieRepository.findById(movie.getId());

        Movie newMovie = movieList.get();
        newMovie.setRatings(movie.getRatings());

        return movieRepository.save(movie);
    }*/

    //1.save rating
    @Override
    public Rating save(Rating rating)
    {
        return ratingRepository.save(rating);
    }

    /*//find ratings by movie_id
    @Override
    public List<Rating> findByMovie_id(int movie_id)
    {
        return ratingRepository.findByMovie_id(movie_id);
    }*/

    //2.fetch ratings by movie id
    @Override
    public List<Rating> findById(Integer id) {
        Rating rating = new Rating();
        rating.setMovie_id(id);
        Example<Rating> ratingExample = Example.of(rating);
        return ratingRepository.findAll(ratingExample);
    }
}