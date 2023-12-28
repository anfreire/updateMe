import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React, { Suspense, useEffect, useState } from "react";
import "@/src/index.css";
import { moviesData } from "../../data";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [
      Autoplay({
        delay: 3000,
      }),
    ],
  );
  const DynamicControllers = React.lazy(() => import("./controllers"));
  const DynamicSingleMovie = React.lazy(() => import("./singleMovie"));

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
    <div className="flex h-screen-no-navbar w-full flex-col items-center justify-center gap-10">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex w-full">
          {Object.keys(moviesData).map((name) => (
            <Suspense>
              <DynamicSingleMovie key={name} name={name} />
            </Suspense>
          ))}
        </div>
      </div>
      <Suspense>
        <DynamicControllers play={play} toggle={toggle} emblaApi={emblaApi} />
      </Suspense>
    </div>
  );
}
