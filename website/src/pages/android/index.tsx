import { useRef } from "react";
import { PhoneImage } from "./components/images/phone";
import Container from "./components/container";
import Title from "./components/title";
import Details from "./components/details";
import { Button } from "@nextui-org/react";

export default function Android() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden"
    >
      <Container
        size="1/2"
        className="mb-[15vh] min-h-[max(50dvh,15rem)] flex w-full flex-col justify-end overflow-hidden"
      >
        <Title />
      </Container>
      <PhoneImage containerRef={containerRef} />
      <Details />
      <div className="mb-[20dvh] flex min-h-[260px] w-full flex-col items-center justify-center">
        <Button
          onClick={() => {
            window.open("https://anfreire.github.io/updateMe/updateMe.apk");
          }}
          size="lg"
          className=" py-8 text-4xl"
          variant="bordered"
        >
          Download
        </Button>
      </div>
    </div>
  );
}
