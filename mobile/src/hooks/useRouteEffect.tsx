import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

export default function useRouteEffect({
  onRoute,
  offRoute,
}: {
  onRoute?: () => void;
  offRoute?: () => void;
}) {
  useFocusEffect(
    React.useCallback(() => {
      onRoute !== undefined ? onRoute() : null;
      return () => {
        offRoute !== undefined ? offRoute() : null;
      };
    }, []),
  );
}
