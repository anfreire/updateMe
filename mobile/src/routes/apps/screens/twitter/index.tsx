import { Text } from "@rneui/themed";
import Frame from "../../../../common/frame";
import { useSource } from "../../../../hooks/useSource";
import ScreenBase from "../../components/screenBase";
import GridFeatures from "../../components/features/variants/grid";
import { TwitterFeauturesGrid } from "./data";

export default function AppsTwitter() {
    const source = useSource()[0]
  return (
    <ScreenBase source={source.TWITTER}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          This is a modded version of the official Twitter app
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          With this version, you can experience Twitter without ads and
          have full control over your feed.
        </Text>
      </Frame>
      <GridFeatures items={TwitterFeauturesGrid} width={2} />
    </ScreenBase>
  );
}
