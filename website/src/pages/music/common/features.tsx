export default function MusicFeatures({ features }: { features: string[] }) {
  return (
    <div className="mt-4 flex w-full flex-col gap-4 md:mt-6 md:gap-6 xl:mt-8 xl:gap-8">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Features
      </h1>
      <ul className="flex flex-col gap-2 md:gap-4 xl:gap-6">
        {features.map((feature) => (
          <li
            key={feature}
            className="text-base sm:text-lg md:text-xl xl:text-2xl"
          >
            - {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
