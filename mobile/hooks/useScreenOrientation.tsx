import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export default function useScreenOrientation() {
  const [orientation, setOrientation] = useState<'LANDSCAPE' | 'PORTRAIT'>(
    'PORTRAIT',
  );
  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  };

  useEffect(() => {
    determineAndSetOrientation();
    const event = Dimensions.addEventListener('change', determineAndSetOrientation);
    return () => event.remove();
  }, []);

  return orientation;
}
