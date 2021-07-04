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
      public critic_rating: string,
      public status: string
    ) {}
}
