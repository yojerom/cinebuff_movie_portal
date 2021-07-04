import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { Key } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  roles: string[] = [];
  public movies: any = [];
  public images: any = [];
  public releasedMovies: any = [];
  public comingsoonMovies: any = [];
  public nums: any = [];
  // image part
  imgName: any;
  imageListFrmMovies: any = [];
  public imageListFrmImages: any = [];
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  storePosterName: any;
  // isTruee = false;
  storePicByte: any = [];

  constructor(private router: Router, private httpService: HttpClientService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {

    this.httpService.getUserBoard().subscribe(
      response => {
        this.movies = response;
      },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.httpService.getImageList().subscribe(
      response => {
        this.images = response;

        for (let i = 0; i < this.movies.length; i++) {
          this.imageListFrmImages[i] = this.images[i].name;
          this.httpService.getImg(this.images[i].name)
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
    this.httpService.getImg(imgName)
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
