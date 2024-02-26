import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Box, ButtonText, Text } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { ControlledInput } from 'src/app/components/inputs';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';
import { MainDrawerParamList } from 'src/types/navigation';
import { commonStyles } from 'src/utils/styles';

import { FormData, validationSchema } from './form-config';

interface Props
  extends DrawerScreenProps<MainDrawerParamList, 'EditPersonalInfo'> {}

export const EditPersonalInfoScreen = ({ navigation }: Props) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { t } = useTranslation();

  const genderOptions = [
    { label: t('common:gender.male'), value: 'MALE' },
    { label: t('common:gender.female'), value: 'FEMALE' },
  ];

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: profileData?.name,
      lastName: profileData?.birthDate,
      birthDate: profileData?.birthDate,
      gender: profileData?.gender,
    },
    resolver: yupResolver(validationSchema),
  });

  const fetchProfileData = (): Promise<ProfileData> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(profileDataFile);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
        reset({
          firstName: data?.name || '',
          lastName: data?.lastName || '',
          birthDate: data?.birthDate || '',
          gender: data?.gender || '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileData, reset]);

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      console.log(data);
    } catch (error: any) {
      Alert.alert(t('screens:editPersonalData:error'), error.message);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.keyboardAvoidingView}
      >
        <ScrollView>
          <Box flex={1} paddingVertical="$10" paddingHorizontal="$12">
            <Box alignItems="center" padding="$2" mb="$6">
              <Text size="2xl" color="$textDark950">
                {t('screens:editPersonalData.heading1')}
              </Text>
            </Box>
            <Box>
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

              <ControlledInput
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
                onPress={() => navigation.goBack()}
                mt="$4"
                bgColor="$error500"
              >
                <ButtonText>{t('common:button.cancel')}</ButtonText>
              </Button>
              <Button
                onPress={handleSubmit(onValidSubmit)}
                mt="$4"
                bgColor="$lime700"
              >
                <ButtonText>{t('common:button.confirm')}</ButtonText>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};