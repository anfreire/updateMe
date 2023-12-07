import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';

export default function AppsYoutubeMusic() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_MUSIC}
      microgSource={source.YOUTUBE_MICROG}
    />
  );
}
