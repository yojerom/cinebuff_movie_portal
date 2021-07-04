package com.macnell.movieservice.repository;

import com.macnell.movieservice.model.PosterImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<PosterImage, Integer> {
    Optional<PosterImage> findByName(String name);
}
