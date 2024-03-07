import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Text } from '@gluestack-ui/themed';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from 'src/assets/svg/navigation-icons/';
import ROUTES from 'src/constants/routes';
import { RootState, useAppDispatch } from 'src/store';
import { startLogoutUser } from 'src/store/auth/thunks';

import { MenuItem } from './components/menu-item';

const navigationRoutes = [
  { route: ROUTES.HOME, icon: <HomeIcon color="#4D7C0F" />, label: 'Home' },
  {
    route: ROUTES.PROFILE,
    icon: <ProfileIcon color="#4D7C0F" />,
    label: 'Profile',
  },
  {
    route: ROUTES.SETTINGS,
    icon: <SettingsIcon color="#4D7C0F" />,
    label: 'Settings',
  },
];

const DrawerContent: FC<DrawerContentComponentProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { displayName } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(startLogoutUser());
    navigation.navigate('Login');
  };

  return (
    <Box flexDirection="column" flex={1}>
      <Box
        flexDirection="column"
        alignItems="center"
        paddingTop={40}
        paddingBottom={15}
        gap={10}
        borderBottomColor="$secondary300"
        borderBottomWidth={2}
      >
        <UserAvatar width={70} height={70} />
        <Text size="xl">{displayName}</Text>
      </Box>

      <Box padding={15}>
        {navigationRoutes.map(({ route, icon, label }) => (
          <MenuItem
            key={route}
            icon={icon}
            label={label}
            onPress={() => navigation.navigate(route)}
          />
        ))}
      </Box>

      <Box justifyContent="flex-end" flex={1} paddingHorizontal={10}>
        <MenuItem icon={<LogoutIcon />} label="Logout" onPress={handleLogout} />
      </Box>
    </Box>
  );
};

export default DrawerContent;
