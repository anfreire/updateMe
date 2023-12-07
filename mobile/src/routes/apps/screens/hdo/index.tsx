import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';

export default function AppsHDO() {
  const hdoSource = useSource()[0].HDO;
  return <ScreenBase source={hdoSource} />;
}
