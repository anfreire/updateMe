import LinuxAndMacOptions from "../common/optionsTable";
import Source from "../common/source";
import MusicBase from "../common/base";
import MusicFeatures from "../common/features";
import MusicCommand from "../common/command";

const features = [
  "Block all audio, banner & video ads",
  "Block logging",
  "Enable developer mode",
  "Enable experimental features",
  "Hide audiobooks, episodes & podcasts on home screen",
  "Remove lyrics background color",
  "Block automatic updates",
  "Install supported desktop client versions",
];

export default function MacMusicTab() {
  return (
    <MusicBase title="Adblock for Spotify Client on Mac OS">
      <MusicFeatures features={features} />
      <MusicCommand
        title="Run the following command in terminal"
        command="bash <(curl -sSL https://spotx-official.github.io/run.sh)"
      />
      <LinuxAndMacOptions variant="mac" />
      <Source link="https://github.com/SpotX-Official/SpotX-Bash" />
    </MusicBase>
  );
}
