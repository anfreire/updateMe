import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';

export default function AppsSpotify() {
  const spotifySource = useSource()[0].SPOTIFY;
  
  return <ScreenBase source={spotifySource} />;
}
