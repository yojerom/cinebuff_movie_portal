import { Component, OnInit } from '@angular/core';
import { HttpClientService, Rating } from '../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movieID: number;
  movieDetails: any;
  content = '';
  public movies: any = [];
  private sub: any;
  form: any = {};
  errorMessage = '';
  ratingModel: Rating = new Rating('', '', 0);
  public ratings: any = [];
  public allocations: any = [];

  // image part
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any; // end

  constructor(private movieService: HttpClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.movieID = +(params['id']); // (+) converts string 'id' to a number
   });
   this.loadMovieDetails(this.movieID);
  }

  loadMovieDetails(id: number) {
    this.movieService.getMovieById(id).subscribe(
      response => {
        this.movies = response;
        this.getImage(this.movies.poster_name);
      },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.movieService.getAllocationByMovieId(id).subscribe(
      response => { this.allocations = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.movieService.getRatingById(id).subscribe(
      response => { this.ratings = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );
  }

  onSubmit() {
    this.movieService.insertComment(this.form, this.movieID).subscribe(
      data => {
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  createRating(): void {
    this.ratingModel.movie_id = this.movies.id;
    this.movieService.insertNewRating(this.ratingModel)
      .subscribe(data => {
        console.log(data);
        alert('commented successfully.');
      });
      window.location.reload();
  }

  getImage(imgName) {
    this.movieService.getImg(imgName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  /*onSubmit() {
    this.movieService.enroll(this.userModel).subscribe(
      data => console.log('Success', data)
    );
  }*/

  /*onSubmit(datas) {
    this.movieService.insertComment(datas, this.movieID).subscribe(
      data => {
        alert('comment : ' + datas.comment);
        /*this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }*/

  /*reloadPage() {
    this.router.navigate(['home'])
  .then(() => {
    window.location.reload();
  });
  }*/
}
