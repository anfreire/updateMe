import fmovies from "@/assets/cinema/fmovies.png";
import themoviearchive from "@/assets/cinema/themoviearchive.png";
import flixhq from "@/assets/cinema/flixhq.png";
import cinehub from "@/assets/cinema/cinehub.png";
import _123movies from "@/assets/cinema/123movies.png";

export interface MovieProps {
  link: string;
  screenshot: string;
}

export type MoviesType = Record<string, MovieProps>;

export const moviesData: MoviesType = {
  FMovies: {
    link: "https://fmoviesz.to/home",
    screenshot: fmovies,
  },
  "The Movie Archive": {
    link: "https://themoviearchive.site/",
    screenshot: themoviearchive,
  },
  FlixHQ: {
    link: "https://flixhq.click/home/",
    screenshot: flixhq,
  },
  CineHub: {
    link: "https://cinehub.wtf/",
    screenshot: cinehub,
  },
  "123Movies": {
    link: "https://123moviesfree.ma/home",
    screenshot: _123movies,
  },
};
