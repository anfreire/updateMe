import { Image } from "@nextui-org/react";
import { moviesData } from "../../data";

export default function Slide({ name }: { name: string }) {
  return (
    <div
      style={{
        flex: "0 0 100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => window.open(moviesData[name].link)}
        className="group m-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 sm:m-6 lg:m-8"
      >
        <Image src={moviesData[name].screenshot} className="object-cover" />
        <h1 className="mt-4 break-words text-center text-6xl  font-thin transition-all duration-300 group-hover:font-extralight group-hover:text-primary sm:mt-6 md:text-7xl lg:mt-8 lg:text-8xl xl:mt-10 xl:text-9xl">
          {name}
        </h1>
      </div>
    </div>
  );
}
