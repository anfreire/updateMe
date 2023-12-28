import LinuxAndMacOptions from "../common/optionsTable";
import Source from "../common/source";
import MusicCommand from "../common/command";
import MusicFeatures from "../common/features";
import MusicBase from "../common/base";

const features = [
  "Block all audio, banner & video ads",
  "Block logging",
  "Enable developer mode",
  "Enable experimental features",
  "Hide audiobooks, episodes & podcasts on home screen",
  "Remove lyrics background color",
  "Install latest desktop client on APT-based distros",
];

export default function LinuxMusicTab() {
  return (
    <MusicBase title="Adblock for Spotify Client on Linux">
      <MusicFeatures features={features} />
      <MusicCommand
        title="Run the following command in terminal"
        command="bash <(curl -sSL https://spotx-official.github.io/run.sh)"
      />
      <LinuxAndMacOptions variant="linux" />
      <Source link="https://github.com/SpotX-Official/SpotX-Bash" />
    </MusicBase>
  );
}
