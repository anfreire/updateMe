import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Play, Pause, ArrowRight, ArrowLeft } from "lucide-react";
import { Container, Provider, Slide } from "./components";
import { MovieProps, MoviesType } from "../..";
import "@/src/index.css";

function SingleMovie({ name, movie }: { name: string; movie: MovieProps }) {
  return (
    <Slide>
      <a
        href={movie.link}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words p-8 text-center text-7xl active:scale-95 font-bold transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-primary md:text-8xl lg:text-9xl"
      >
        {name}
      </a>
    </Slide>
  );
}

export default function Carousel({ movies }: { movies: MoviesType }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 3000,
      }),
    ],
  );

  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (emblaApi) {
      setPlay((emblaApi as any).plugins().autoplay.isPlaying());
      emblaApi.on("autoplay:play" as any, () => setPlay(true));
      emblaApi.on("autoplay:stop" as any, () => setPlay(false));
    }
    return () => {
      if (emblaApi) {
        emblaApi.off("autoplay:play" as any, () => setPlay(true));
        emblaApi.off("autoplay:stop" as any, () => setPlay(false));
      }
    };
  }, [emblaApi]);

  const toggle = () =>
    emblaApi && (emblaApi as any).plugins().autoplay.isPlaying()
      ? emblaApi && (emblaApi as any).plugins().autoplay.stop()
      : emblaApi && (emblaApi as any).plugins().autoplay.play();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <Provider ref={emblaRef}>
        <Container>
          {Object.keys(movies).map((name) => (
            <SingleMovie key={name} name={name} movie={movies[name]} />
          ))}
        </Container>
      </Provider>
      <div className="flex w-full flex-row items-center justify-between px-12">
        <ArrowLeft
          className=" size-10 cursor-pointer"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
        />
        {play ? (
          <Pause className=" size-10 cursor-pointer" onClick={toggle} />
        ) : (
          <Play className=" size-10 cursor-pointer" onClick={toggle} />
        )}
        <ArrowRight
          className=" size-10 cursor-pointer"
          onClick={() => emblaApi && emblaApi.scrollNext()}
        />
      </div>
    </div>
  );
}
