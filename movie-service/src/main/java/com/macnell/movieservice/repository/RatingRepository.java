package com.macnell.movieservice.repository;

import com.macnell.movieservice.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating,Integer>  {

    /*List<Rating> findByMovie_id(int movie_id);*/
}
