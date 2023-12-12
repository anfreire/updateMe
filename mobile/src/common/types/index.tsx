export type IconType =
  | 'material'
  | 'material-community'
  | 'ionicon'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'simple-line-icon'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'fontisto'
  | 'feather'
  | 'zocial'
  | 'material-community';

export interface IconProps {
  name: string;
  type: IconType;
}

export type StateColors = 'RED' | 'GREEN' | 'YELLOW';
