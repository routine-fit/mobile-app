import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Divider, Text } from '@gluestack-ui/themed';

import { SharedModal } from 'src/app/components/modal';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { ProfileData } from 'src/interfaces/profile-data';
import profileDataFile from 'src/mocks/profile-data.json';
import { RootState } from 'src/store';
import { commonStyles } from 'src/utils/styles';

import { InfoBox } from './components/info-box';
import { ModalContent } from './components/modal-content';
import { ProfileSectionHeader } from './components/profile-section-header';
import { ProfileScreenProps } from './types';

const deviceWidth = Dimensions.get('window').width;

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileData]);

  const { displayName } = useSelector((state: RootState) => state.auth);
  return (
    <SafeAreaView style={commonStyles.safeAreaViewStyle}>
      <ScrollView>
        <Box flexDirection="column" alignItems="center" flex={1}>
          <Box
            padding={'$6'}
            alignItems="center"
            gap={15}
            width={deviceWidth}
            bgColor="$light200"
          >
            <UserAvatar width={70} height={70} />
            <Text color="$textDark950">{displayName}</Text>
          </Box>
          <Box
            my="$2"
            paddingVertical="$5"
            paddingHorizontal="$7"
            gap={10}
            width={deviceWidth}
          >
            <ProfileSectionHeader
              title="Informacion de perfil"
              onEditPress={() => navigation.navigate('EditPersonalInfo')}
            />

            <Box paddingHorizontal="$7">
              <InfoBox value={profileData?.name} label="Nombre" />
              <InfoBox value={profileData?.lastName} label="Apellido" />
              <InfoBox value={profileData?.gender} label="Genero" />
              <InfoBox value={profileData?.email} label="Email" />
              <InfoBox
                value={profileData?.birthDate}
                label="Fecha de nacimiento"
              />
            </Box>
            <Divider bg="$backgroundLight300" h={2} my="$1.5" />

            <ProfileSectionHeader
              title="Medidas corporales"
              onEditPress={() => {
                setShowModal(true);
              }}
            />
            <Box paddingHorizontal="$7">
              <InfoBox value={profileData?.weight} label="Peso" />
              <InfoBox value={profileData?.height} label="Estatura" />
            </Box>
            <Divider bg="$backgroundLight300" h={2} my="$1.5" />

            <ProfileSectionHeader
              title="Preferencias de entrenamiento"
              onEditPress={() => navigation.navigate('EditTrainingPreferences')}
            />
            <Box paddingHorizontal="$7">
              <InfoBox
                value={profileData?.trainingType}
                label="Tipo de entrenamiento"
              />
              <InfoBox
                value={profileData?.trainingTime}
                label="Tiempo de entrenamiento"
              />
              <InfoBox
                value={profileData?.trainingIntensity}
                label="Intensidad de entrenamiento"
              />
              <InfoBox
                value={profileData?.trainingGoals}
                label="Objetivos de entrenamiento"
              />
            </Box>
          </Box>
          <SharedModal
            open={showModal}
            onClose={() => setShowModal(false)}
            title="Medidas corporales"
            body={<ModalContent onClose={() => setShowModal(false)} />}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
