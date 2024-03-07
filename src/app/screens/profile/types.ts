import { DrawerScreenProps } from '@react-navigation/drawer';

import { MainDrawerParamList } from 'src/types/navigation';

export interface ProfileScreenProps
  extends DrawerScreenProps<MainDrawerParamList, 'Profile'> {}
