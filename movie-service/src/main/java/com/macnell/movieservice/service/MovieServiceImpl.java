package com.macnell.movieservice.service;

import com.macnell.movieservice.model.Allocation;
import com.macnell.movieservice.model.Movie;
import com.macnell.movieservice.model.Rating;
import com.macnell.movieservice.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {
    @Bean
    @LoadBalanced
    RestTemplate getRestTemplate()
    {
        return new RestTemplate();
    }

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MovieRepository movieRepository;

    //1.save the movie
    @Override
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    //2.fetch movie details by id
    @Override
    public Movie fetchMovieDetails(int id) {
        Optional<Movie> movies = movieRepository.findById(id);

        if(movies.isPresent())
        {
            Movie movieObj = movies.get();
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<String> httpEntity = new HttpEntity<String>("",httpHeaders);
            ResponseEntity<Allocation[]> responseEntity =  restTemplate.exchange(
                    "http://THEATRE/AllocationService/findbyid/"+ id, HttpMethod.GET, httpEntity, Allocation[].class);
            movieObj.setAllocations(responseEntity.getBody());
            return movieObj;
        }
        return null;
    }

    //sample by id
    @Override
    public Optional<Movie> findById(int id) {
        return movieRepository.findById(id);
    }

    //3.fetch all movies
    @Override
    public List<Movie> fetchAllMovies(){
        return movieRepository.findAll();
    }

    //4.update the movie details by id
    @Override
    public Movie updateMovie(Movie movie) {
        Optional<Movie> movieList = movieRepository.findById(movie.getId());

        Movie newMovie = movieList.get();
        newMovie.setMovie_name(movie.getMovie_name());
        newMovie.setCast(movie.getCast());
        newMovie.setDirector(movie.getDirector());
        newMovie.setGenre(movie.getGenre());
        newMovie.setRelease_date(movie.getRelease_date());
        newMovie.setRunning_time(movie.getRunning_time());
        newMovie.setDistributor(movie.getDistributor());
        newMovie.setLanguage(movie.getLanguage());
        newMovie.setSynopsis(movie.getSynopsis());
        newMovie.setCritic_rating(movie.getCritic_rating());
        newMovie.setStatus(movie.getStatus());

        newMovie = movieRepository.save(newMovie);

        return newMovie;
    }

    //5.fetch movies by status
    @Override
    public List<Movie> fetchReleasedMovies(String movieStatus)
    {
        Movie movie = new Movie();
        movie.setStatus(movieStatus);
        Example<Movie> movieExample = Example.of(movie);
        return movieRepository.findAll(movieExample);
        /*}
        else if (movieStatus="Released")
        {
            Movie movie = new Movie();
            movie.setStatus(movieStatus);
            Example<Movie> movieExample = Example.of(movie);
            return movieRepository.findAll(movieExample);
            return movieRepository.findAll();
        }
        return movieRepository.findAll();*/
    }

    //6.fetch movies by rating

}

/*public Optional<Movie> findById(int id) {
    return movieRepository.findById(id);
}*/