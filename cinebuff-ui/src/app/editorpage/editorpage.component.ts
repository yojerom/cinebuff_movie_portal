import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClientService, Movie, Allocation } from '../service/http-client.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editorpage',
  templateUrl: './editorpage.component.html',
  styleUrls: ['./editorpage.component.css']
})
export class EditorpageComponent implements OnInit {
  modalRef: BsModalRef;
  modalRefEdit: BsModalRef;
  modalRefAllo: BsModalRef;
  content = '';
  movie = 'a';
  roles: string[] = [];
  public movies: any = [];
  public theatres: any = [];
  public allocations: any = [];
  public editmovies: any = [];
  form: any = {};
  editMovieId: number;

  // image part
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any; // end

  /*rate: Ratings[] = [
    {
      'user_rating': '',
      'comment': ''
     },
     {
       'user_rating': '',
        'comment': ''
     }
  ];*/

  movieModel: Movie = new Movie('', '', '', '', '', '', '', '', '', 1, '', '');
  editMovieModel: Movie = new Movie('', '', '', '', '', '', '', '', '', 1, '', '');
  allocationModel: Allocation = new Allocation(0, '');

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private movieService: HttpClientService, private tokenStorage: TokenStorageService, private modalService: BsModalService) { }

  ngOnInit() {
    // load movies in a table under movies tap
    this.movieService.getEditorMovies().subscribe(
      response => { this.movies = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );
    // load allocations in a table under allocation tap
    this.movieService.getEditorAllocations().subscribe(
      response => { this.allocations = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );
    // load theatres in a dropdown under allocation tap
    this.movieService.getEditorTheatres().subscribe(
      response => { this.theatres = response; },
      err => { this.content = JSON.parse(err.error).message; }
    );

    this.roles = this.tokenStorage.getUser().roles;
  }
  handleSuccessfulResponse(response) {
    this.movies = response;
  }

  onSubmit() {
    this.movieService.insertMovie(this.form).subscribe(
      data => {
      },
      err => {
        this.content = err.error.message;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(templateEdit: TemplateRef<any>) {
    this.modalRefEdit = this.modalService.show(templateEdit);
  }

  openModalAllo(templateAllo: TemplateRef<any>) {
    this.modalRefAllo = this.modalService.show(templateAllo);
  }

  createMovie(): void {
    this.movieModel.poster_name = this.selectedFile.name;
    this.movieService.insertNewMovie(this.movieModel)
      .subscribe(data => {
        console.log(data);
        alert('Movie created successfully.');
      });
      window.location.reload();
  }

  loadMovieDetailsForEdit(id: number) {
    this.editMovieId = id;
    this.movieService.getMovieById(id).subscribe(
      response => { this.getMovieDetailsForEdit(response); },
      err => { this.content = JSON.parse(err.error).message; }
    );
  }
  getMovieDetailsForEdit(response) {
    this.editMovieModel = response;
  }

  updateMovie(): void {
    this.movieService.updateExistMovie(this.editMovieModel, this.editMovieId)
      .subscribe(data => {
        console.log(data);
        alert('Movie updated successfully.');
      });
      window.location.reload();
  }

  createAllocation(): void {
    this.movieService.insertNewAllocation(this.allocationModel)
      .subscribe(data => {
        console.log(data);
        alert('theatre allocated successfully.');
      });
      window.location.reload();
  }

  deleteAllocation(allocation: Allocation): void {
    console.log('delete Allocation');
    this.movieService.deleteExistAllocation(allocation)
      .subscribe(data => {
        console.log(data);
        this.allocations = this.allocations.filter(u => u !== allocation);
      });
  }

  // Gets called when the user selects an image
   public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }

  // Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // Make a call to the Spring Boot Application to save the image
    this.movieService.uploadImg( uploadImageData)
      .subscribe((response) => {
        console.log(response);
       }
      );
  }

    // Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.movieService.getImg(this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
