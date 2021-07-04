import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  content = '';
  movie = '';
  roles: string[] = [];
  public movies: any = [];
  public theatres: any = [];


  constructor(private router: Router, private employeeService: HttpClientService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.employeeService.getUserBoard().subscribe(
      response => { this.movies = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.employeeService.getAllTheatres().subscribe(
      response => { this.theatres = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.roles = this.tokenStorage.getUser().roles;
  }

  selectMovie(id: number) {
    this.router.navigate(['/moviedetails', id]);
  }

}
