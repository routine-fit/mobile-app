import { t } from 'i18next';
import React from 'react';

import { LoginScreen } from 'src/app/screens/auth/login';
import { BackArrowIcon } from 'src/assets/svg/navigation-icons';

import { Header } from '../components/header';
import { CompleteDataScreen } from '../screens/auth/signup/complete-data';
import { CreateAccountScreen } from '../screens/auth/signup/create-account';
import { RootStack } from './root-stack';

export const getAuthenticatedGroup = () => {
  return (
    <RootStack.Group screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Group screenOptions={{ headerShown: true }}>
        <RootStack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={({ navigation }) => ({
            header: () => (
              <Header
                leftText={t('navigation:headers.login')}
                headerLeft={<BackArrowIcon />}
                onPressLeft={navigation.goBack}
              />
            ),
          })}
        />
        <RootStack.Screen
          name="CompleteData"
          component={CompleteDataScreen}
          options={({ navigation }) => ({
            header: () => (
              <Header
                headerTitle={t('navigation:headers.completeDataScreen')}
                headerLeft={<BackArrowIcon />}
                onPressLeft={navigation.goBack}
              />
            ),
          })}
        />
      </RootStack.Group>
    </RootStack.Group>
  );
};
