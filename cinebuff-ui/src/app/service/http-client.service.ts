import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Movie {
  constructor(
    public movie_name: string,
    public cast: string,
    public director: string,
    public genre: string,
    public release_date: string,
    public running_time: string,
    public distributor: string,
    public language: string,
    public synopsis: string,
    public critic_rating: number,
    public status: string,
    public poster_name: string
  ) {}
}

export class Rating {
  constructor(
    public user_rating: string,
    public comment: string,
    public movie_id: number
  ) {}
}

export class ImageCard {
  constructor(
    public id: number,
    public movie_name: string,
    public critic_rating: number,
    public source: any
  ) {}
}

export class Allocation {
  constructor(
    public movId: number,
    public booking: string
  ) {}
}

const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPublicContent(movieStatus) {
    return this.httpClient.get('http://localhost:8181/MovieService/fetchMoviesByStatus/' + movieStatus);
  }

  public getUserBoard() {
    return this.httpClient.get('http://localhost:8181/MovieService/fetchAllMovies');
  }

  public getEditorMovies() {
    return this.httpClient.get('http://localhost:8181/MovieService/fetchAllMovies');
  }

  public getEditorAllocations() {
    return this.httpClient.get('http://localhost:8081/AllocationService/fetchAllAllocations');
  }

  public getEditorTheatres() {
    return this.httpClient.get('http://localhost:8081/TheatreService/fetchAllTheatres');
  }

  public insertNewAllocation(allocation): Observable<Allocation> {
    return this.httpClient.post<Allocation>('http://localhost:8081/AllocationService/saveAllocation', allocation, httpOptions);
  }

  public deleteExistAllocation(allocation) {
    return this.httpClient.delete<Allocation>('http://localhost:8081/AllocationService/deleteAllocation/' + allocation.id);
  }

  public insertNewRating(rating): Observable<Rating> {
    return this.httpClient.post<Rating>('http://localhost:8181/RatingService/saveRating', rating, httpOptions);
  }

  public getMovieById(id: number) {
    return this.httpClient.get('http://localhost:8181/MovieService/fetchMovie/' + id);
  }

  public getRatingById(id: number) {
    return this.httpClient.get('http://localhost:8181/RatingService/fetchRatingsByMovieId/' + id);
  }

  public getAllocationByMovieId(id: number) {
    return this.httpClient.get('http://localhost:8081/AllocationService/fetchAllocationByMovieId/' + id);
  }

  public getAllTheatres() {
    return this.httpClient.get('http://localhost:8081/TheatreService/fetchAllTheatres');
  }

  public insertNewMovie(movie): Observable<Movie> {
    return this.httpClient.post<Movie>('http://localhost:8181/MovieService/saveMovie', movie, httpOptions);
  }

  public updateExistMovie(movie, movieId): Observable<Movie> {
    return this.httpClient.post<Movie>('http://localhost:8181/MovieService/updateMovie/' + movieId, movie, httpOptions);
  }

  // image part
  public uploadImg(uploadImgData) {
    return this.httpClient.post('http://localhost:8181/image/upload', uploadImgData);
  }

  public getImg(getImgName) {
    return this.httpClient.get('http://localhost:8181/image/get/' + getImgName);
  }

  public getImageList() {
    return this.httpClient.get('http://localhost:8181/image/fetchAllImages/');
  }

  // theatres


  // unused methods
  public insertMovie(credentials): Observable<any> {
    return this.httpClient.post('http://localhost:8181/MovieService/saveMovie', {
      movie_name: credentials.movie_name,
      cast: credentials.cast,
      director: '',
      genre: '',
      release_date: '',
      running_time: '',
      distributor: '',
      language: '',
      synopsis: '',
      critic_rating: '',
      status: ''
    }, httpOptions);
  }

  insertComment(credentials, movId): Observable<any> {
    return this.httpClient.post('http://localhost:8181/RatingService/saveRating', {
      id: movId,
      comment: credentials.comment,
      user_rating: credentials.user_rating
    }, httpOptions);
  }

  /*enroll(rating: Rating) {
    return this.httpClient.post<any>('http://localhost:8181/RatingService/saveRating', rating);
  }*/
}
