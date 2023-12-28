import LinuxAndMacOptions from "../common/optionsTable";
import Source from "../common/source";
import MusicBase from "../common/base";
import MusicFeatures from "../common/features";
import MusicCommand from "../common/command";
import { tabData } from "../data";

export default function MacMusicTab() {
  return (
    <MusicBase title="Adblock for Spotify Client on Mac OS">
      <MusicFeatures features={tabData.mac.features} />
      <MusicCommand
        title="Run the following command in terminal"
        command={tabData.mac.command}
      />
      <LinuxAndMacOptions variant="mac" />
      <Source link="https://github.com/SpotX-Official/SpotX-Bash" />
    </MusicBase>
  );
}
