package com.macnell.movieservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "movie")
public class Movie
{
    public Movie() { }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    private String movie_name;
    private String cast;
    private String director;
    private String genre;
    private String release_date;
    private String running_time;
    private String distributor;
    private String language;
    private String synopsis;
    private Integer critic_rating;
    private String status;
    private String poster_name;

    /*@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    //@JsonIgnore
    private List<Rating> ratings;*/

    Allocation[] allocations;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getRunning_time() {
        return running_time;
    }

    public void setRunning_time(String running_time) {
        this.running_time = running_time;
    }

    public String getDistributor() {
        return distributor;
    }

    public void setDistributor(String distributor) {
        this.distributor = distributor;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public Integer getCritic_rating() {
        return critic_rating;
    }

    public void setCritic_rating(Integer critic_rating) {
        this.critic_rating = critic_rating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /*public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }*/

    public String getPoster_name() {
        return poster_name;
    }

    public void setPoster_name(String poster_name) {
        this.poster_name = poster_name;
    }

    public Allocation[] getAllocations() {
        return allocations;
    }

    public void setAllocations(Allocation[] allocations) {
        this.allocations = allocations;
    }
}