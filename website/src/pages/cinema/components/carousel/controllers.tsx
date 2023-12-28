import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const iconClassName =
  "size-8 cursor-pointer md:size-10 hover:text-secondary hover:scale-110 active:scale-90 transition-all duration-300";

export default function Controllers({
  play,
  toggle,
  emblaApi,
}: {
  play: boolean;
  toggle: () => void;
  emblaApi: any;
}) {
  if (!emblaApi) {
    return null;
  }
  return (
    <div className="flex h-20 w-full max-w-[500px] flex-row items-center justify-between px-12">
      <ArrowLeft
        className={iconClassName}
        onClick={() => emblaApi.scrollPrev()}
      />
      {play ? (
        <Pause className={iconClassName} onClick={toggle} />
      ) : (
        <Play className={iconClassName} onClick={toggle} />
      )}
      <ArrowRight
        className={iconClassName}
        onClick={() => emblaApi.scrollNext()}
      />
    </div>
  );
}
