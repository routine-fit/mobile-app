import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  RoutinesScreen: undefined;
  HomeScreen: undefined;
  ExerciseScreen: undefined;
};

export type MainDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  EditPersonalInfo: undefined;
  EditTrainingPreferences: undefined;
};

export type RootStackParamList = {
  // TODO : onboarding , auth, etc
  Main: NavigatorScreenParams<MainDrawerParamList>;
  Login: undefined;
  CreateAccount: undefined;
  CompleteData: undefined;
};
