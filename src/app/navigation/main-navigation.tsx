import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import DrawerContent from 'src/app/components/drawer';
import { ProfileScreen } from 'src/app/screens';

import { BottomTab } from './bottom-tab';

export type MainDrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const renderContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainAppNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 240 } }}
      drawerContent={renderContent}
    >
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};