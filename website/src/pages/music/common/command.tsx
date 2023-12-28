import Command from "@/src/common/command";

export default function MusicCommand({
  title,
  command,
}: {
  title: string;
  command: string;
}) {
  return (
    <div className="flex h-24 w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-xl font-bold md:text-2xl">{title}</p>
      <Command command={command} />
    </div>
  );
}
