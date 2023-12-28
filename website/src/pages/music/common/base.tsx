import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { FaSpotify } from "react-icons/fa";

const gap = "gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24";

export default function MusicBase({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      shadow="lg"
      className="smart-x-padding mb-[max(30dvh,15rem)] p-4 mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28"
      isBlurred
    >
      <CardHeader
        className={"flex w-full flex-col items-center justify-center " + gap}
      >
        <FaSpotify
          color="#1DB954"
          className="size-12 sm:size-16 md:size-20 lg:size-24 xl:size-28"
        />
        <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {title}
        </h1>
      </CardHeader>
      <CardBody
        className={
          "flex h-full w-full flex-col items-center justify-center " + gap
        }
      >
        {children}
      </CardBody>
    </Card>
  );
}
