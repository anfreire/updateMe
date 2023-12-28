import { Tabs, Tab, Button } from "@nextui-org/react";
import { AlertTriangle, Download } from "lucide-react";
import { useState } from "react";
import { TbBrandPowershell } from "react-icons/tb";
import Source from "../common/source";
import MusicBase from "../common/base";
import MusicFeatures from "../common/features";
import MusicCommand from "../common/command";

const powershellCode =
  "[Net.ServicePointManager]::SecurityProtocol = 3072; iex \"& { $(iwr -useb 'https://spotx-official.github.io/run.ps1') } -confirm_uninstall_ms_spoti -confirm_spoti_recomended_over -podcasts_off -block_update_on -start_spoti -new_theme -adsections_off -lyrics_stat spotify\"";

const features = [
  "Blocks all banner, video and audio ads in the client",
  "Disabled Sentry (Prevented Sentry from sending console log/error/warning to Spotify developers)",
  "Disabled logging (Stopped various elements to log user interaction)",
  "Removed RTL rules (Removed all right-to-left CSS rules to simplify CSS files)",
  "Code minification",
];

const MusicWindowsWarning = () => (
  <div className="flex w-80 max-w-fit flex-row items-center justify-center gap-4 rounded-md border border-yellow-500 bg-[rgba(234,179,8,0.1)] p-4 xl:w-96">
    <div className="flex items-center justify-center">
      <AlertTriangle className="size-10 stroke-current stroke-1 sm:size-12 md:size-16 xl:size-20" />
    </div>
    <div className="flex items-center justify-center text-center text-lg font-bold md:text-xl xl:text-2xl">
      <p>This will only work on Windows 7 and above</p>
    </div>
  </div>
);

export default function WindowsMusicTab() {
  const [active, setActive] = useState<"download" | "powershell">("powershell");

  return (
    <MusicBase title="Modified Spotify Client for Windows">
      <MusicWindowsWarning />
      <MusicFeatures features={features} />
      <div className="mt-6 flex w-full flex-col gap-4 md:mt-8 md:gap-6 lg:mt-10 xl:mt-12 xl:gap-8">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Installation
        </h1>
        <p className="text-justify text-base sm:text-lg md:text-xl xl:text-2xl">
          Installing this customized Spotify client on Windows can be done in
          two ways. The script can be launched directly on{" "}
          <strong>PowerShell</strong> or downloaded and executed as a{" "}
          <strong>.bat</strong> file.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 xl:gap-8">
          <Tabs
            onSelectionChange={(key: any) => setActive(key)}
            selectedKey={active}
            variant="bordered"
            size="lg"
            className="mt-4 flex flex-col justify-center gap-4 sm:w-96 md:gap-6 xl:gap-8"
          >
            <Tab
              key="powershell"
              title={
                <div className="flex items-center justify-center gap-2">
                  <TbBrandPowershell className="size-6 stroke-1" />
                  PowerShell
                </div>
              }
            ></Tab>
            <Tab
              key="download"
              title={
                <div className="flex items-center justify-center gap-2">
                  <Download className="size-6" />
                  Download
                </div>
              }
            ></Tab>
          </Tabs>
        </div>
        <>
          {active == "powershell" ? (
            <MusicCommand
              title="Run the following command in PowerShell"
              command={powershellCode}
            />
          ) : (
            <div className="flex h-24 w-full flex-col items-center justify-center gap-4">
              <p className="text-center text-xl font-bold md:text-2xl">
                Download the executable script and click on it to run
              </p>
              <Button
                size="lg"
                variant="shadow"
                onClick={() => {
                  window.open(
                    "https://raw.githack.com/amd64fox/SpotX/main/scripts/Install_Auto.bat",
                  );
                }}
              >
                Download Script
              </Button>
            </div>
          )}
        </>
      </div>
      <Source link="https://github.com/SpotX-Official/SpotX" />
    </MusicBase>
  );
}
