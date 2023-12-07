import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';

export default function AppsYoutube() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_YOUTUBE}
      microgSource={source.YOUTUBE_MICROG}
    />
  );
}
