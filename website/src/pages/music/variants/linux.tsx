import LinuxAndMacOptions from "../common/optionsTable";
import Source from "../common/source";
import MusicCommand from "../common/command";
import MusicFeatures from "../common/features";
import MusicBase from "../common/base";
import { tabData } from "../data";

export default function LinuxMusicTab() {
  return (
    <MusicBase title="Adblock for Spotify Client on Linux">
      <MusicFeatures features={tabData.linux.features} />
      <MusicCommand
        title="Run the following command in terminal"
        command={tabData.linux.command}
      />
      <LinuxAndMacOptions variant="linux" />
      <Source link="https://github.com/SpotX-Official/SpotX-Bash" />
    </MusicBase>
  );
}
