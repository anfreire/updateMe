import "@/src/index.css";
import Source from "../music/common/source";
import Carousel from "./components/carousel";

export interface MovieProps {
  link: string;
}

export type MoviesType = Record<string, MovieProps>;

const movies: MoviesType = {
  FMovies: {
    link: "https://fmoviesz.to/home",
  },
  "The Movie Archive": {
    link: "https://themoviearchive.site/",
  },
  FlixHQ: {
    link: "https://flixhq.click/home/",
  },
  CineHub: {
    link: "https://cinehub.wtf/",
  },
  "123Movies": {
    link: "https://123moviesfree.ma/home",
  },
};

export default function Cinema() {
  return (
    <div className="smart-x-padding pb-20 flex h-full w-full flex-col items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
      <Carousel movies={movies} />
      <Source link="https://fmhy.pages.dev/videopiracyguide" />
    </div>
  );
}
