import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  ExerciseScreen,
  HomeScreen,
  RoutinesScreen,
} from 'src/app/screens/index';
import {
  DumbbellIcon,
  HomeIcon,
  RoutineIcon,
} from 'src/assets/svg/navigation-icons';
import { BottomTabParamList } from 'src/types/navigation';

import { Header } from '../components/header';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabBarOptions: BottomTabNavigationOptions = {
  headerShown: true,
  tabBarActiveBackgroundColor: '#D9D9D9',
  tabBarInactiveBackgroundColor: '#D9D9D9',
  tabBarShowLabel: false,
  header: ({ options }) => <Header headerTitle={options.headerTitle} />,
};

const renderIcon = (icon: JSX.Element, focused: boolean) =>
  React.cloneElement(icon, {
    color: focused ? '#4D7C0F' : '#404040',
  });

export const BottomTab = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="HomeScreen">
      <Tab.Screen
        name="RoutinesScreen"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<RoutineIcon />, focused),
          headerTitle: t('navigation:headers.routines'),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<HomeIcon />, focused),
          headerTitle: t('navigation:headers.home'),
        }}
      />
      <Tab.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<DumbbellIcon />, focused),
          headerTitle: t('navigation:headers.exercises'),
        }}
      />
    </Tab.Navigator>
  );
};
