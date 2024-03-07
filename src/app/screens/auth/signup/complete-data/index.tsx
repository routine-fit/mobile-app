import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import ControlledDatepicker from 'src/app/components/datepicker';
import { ControlledInput } from 'src/app/components/inputs';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { RootState, useAppDispatch } from 'src/store';
import { startCreateUserInfo } from 'src/store/auth/thunks';
import { RootStackParamList } from 'src/types/navigation';
import { commonStyles } from 'src/utils/styles';

import { FormData, validationSchema } from './form-config';

export const CompleteDataScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'CompleteData'>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { uid } = useSelector((state: RootState) => state.auth);

  const genderOptions = [
    { label: t('common:gender.male'), value: 'MALE' },
    { label: t('common:gender.female'), value: 'FEMALE' },
  ];

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      gender: undefined,
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { firstName, lastName, birthDate, gender } = data;

      const userInfo = {
        firebaseUid: uid || '',
        name: firstName,
        lastName,
        birthDate,
        gender,
        pushNotification: false,
      };
      await dispatch(startCreateUserInfo(userInfo));
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        style={commonStyles.keyboardAvoidingView}
      >
        <Box padding={20} flex={1} justifyContent="center" mt="$6" mb="$8">
          <Text size="2xl" textAlign="center" mb="$4">
            {t('screens:completeData.heading1')}
          </Text>
          <ControlledInput
            controller={{
              control,
              name: 'firstName',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />
          <ControlledInput
            controller={{
              control,
              name: 'lastName',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />

          <ControlledDatepicker
            controller={{
              control,
              name: 'birthDate',
            }}
            formControlProps={{
              mb: '$4',
            }}
          />
          <ControlledSelectInput
            controller={{
              control,
              name: 'gender',
            }}
            formControlProps={{
              mb: '$4',
            }}
            options={genderOptions}
          />

          <Button
            onPress={handleSubmit(onValidSubmit)}
            mt="$4"
            bgColor="$lime600"
          >
            <ButtonText>{t('common:button.confirm')}</ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
