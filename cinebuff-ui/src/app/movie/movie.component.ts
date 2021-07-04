import { Component, OnInit } from '@angular/core';
import { HttpClientService, ImageCard } from '../service/http-client.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  content = '';
  movie = '';
  roles: string[] = [];
  public movies: any = [];
  notsure: any;
  public images: any = [];
  public commonModel: any = [];

  movieList: ImageCard = new ImageCard(0, '', 0, '');

  // image part
  imageListFrmMovies: any = [];
  public imageListFrmImages: any = [];
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any; // end

  constructor(private router: Router, private movieService: HttpClientService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {

    this.movieService.getUserBoard().subscribe(
      response => {
        this.movies = response;
      },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.movieService.getImageList().subscribe(
      response => {
        this.images = response;

        for (let i = 0; i < this.movies.length; i++) {
          this.imageListFrmImages[i] = this.images[i].name;
          this.movieService.getImg(this.images[i].name)
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              // this.images[i].picByte = this.retrievedImage;
              this.movies[i].poster_name = this.retrievedImage;
            }
          );
        }

      },
      err => { this.content = JSON.parse(err.error).message; }
    );
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

  selectMovie(ngImg) {
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].poster_name === ngImg) {
        this.router.navigate(['/moviedetails', this.movies[i].id]);
      }
    }
  }
}
