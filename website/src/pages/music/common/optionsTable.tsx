import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export interface LinuxAndMacOptionsProps {
  variant: "linux" | "mac";
}

const items: Record<string, React.ReactNode | string> = {
  "-B": "block Spotify auto-updates",
  "-c": "clear Spotify app cache",
  "-d": (
    <>
      enable{" "}
      <a
        className="text-blue-500 underline"
        href="https://github.com/SpotX-Official/SpotX-Bash/wiki/SpotX%E2%80%90Bash-FAQ#what-is-developer-mode"
      >
        developer mode
      </a>
    </>
  ),
  "-e": "exclude all experimental features",
  "-f": "force SpotX-Bash to run",
  "-h": "hide non-music on home screen",
  "--help": "print options",
  "-i": "enable interactive mode",
  "--installdeb": "install latest client deb pkg on APT-based distros",
  "--installmac": "install latest supported client",
  "-l": (
    <a
      className="text-blue-500 underline"
      href="https://github.com/SpotX-Official/SpotX-Bash/issues/20#issuecomment-1762040019"
      data-hovercard-type="issue"
      data-hovercard-url="/SpotX-Official/SpotX-Bash/issues/20/hovercard"
    >
      no lyrics background color
    </a>
  ),
  "-o": (
    <>
      use{" "}
      <a
        className="text-blue-500 underline"
        href="https://github.com/SpotX-Official/SpotX-Bash/wiki/SpotX%E2%80%90Bash-FAQ#what-is-the-old-and-new-ui"
      >
        old home screen UI
      </a>
    </>
  ),
  "-p": (
    <a
      className="text-blue-500 underline"
      href="https://github.com/SpotX-Official/SpotX-Bash/wiki/SpotX%E2%80%90Bash-FAQ#can-spotx-bash-be-used-with-a-paid-premium-account"
    >
      paid premium-tier subscriber
    </a>
  ),
  "-P <path>": "set path to Spotify",
  "-S": (
    <>
      skip{" "}
      <a
        className="text-blue-500 underline"
        href="https://github.com/SpotX-Official/SpotX-Bash/discussions/3"
        data-hovercard-type="discussion"
        data-hovercard-url="/SpotX-Official/SpotX-Bash/discussions/3/hovercard"
      >
        codesigning
      </a>{" "}
    </>
  ),
  "--stable": "use with '--installdeb' for stable branch",
  "--uninstall": "uninstall SpotX-Bash",
  "-v": "print SpotX-Bash version",
  "-V <version>": "install client version",
};

const common: string[] = [
  "-c",
  "-d",
  "-e",
  "-f",
  "-h",
  "--help",
  "-i",
  "-l",
  "-o",
  "-p",
  "-P <path>",
  "-v",
  "--uninstall",
];

const exclusive: Record<"linux" | "mac", string[]> = {
  linux: ["--installdeb", "--stable"],
  mac: ["-B", "-S", "--installmac", "-V <version>"],
};

export default function LinuxAndMacOptions({
  variant,
}: LinuxAndMacOptionsProps) {
  return (
    <Table fullWidth className="mt-6 rounded-xl border border-gray-1/3">
      <TableHeader className="rounded-b-none">
        {['Option', 'Description'].map((header, index) => (
          <TableColumn key={index} className="p-3 text-lg md:text-xl">{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {[...common, ...exclusive[variant]]
          .sort((a, b) => a.length - b.length)
          .map((option, index) => (
            <TableRow
              key={index}
              className={index != 0 ? "border-t-1 border-gray-1/3" : ""}
            >
              <TableCell className="text-base md:text-lg">{option}</TableCell>
              <TableCell className="text-base">{items[option]}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
