import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Box, Button, HStack } from '@gluestack-ui/themed';
import { ButtonText } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';

import { ControlledInput } from 'src/app/components/inputs';

import { FormData, validationSchema } from './form-config';

interface Props {
  onClose: () => void;
}

export const ModalContent: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      weight: '',
      height: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      console.log(data);
      onClose();
    } catch (error: any) {
      Alert.alert(t('screens:editTrainingPreferences:error'), error.message);
    }
  };

  return (
    <Box>
      <ControlledInput
        controller={{
          control,
          name: 'weight',
        }}
        formControlProps={{
          mb: '$2',
        }}
      />

      <ControlledInput
        controller={{
          control,
          name: 'height',
        }}
        formControlProps={{
          mb: '$2',
        }}
      />

      <HStack justifyContent="flex-end" gap="$2" paddingVertical="$2">
        <Button onPress={onClose} bgColor="$error500">
          <ButtonText>{t('common:button.cancel')}</ButtonText>
        </Button>
        <Button onPress={handleSubmit(onValidSubmit)} bgColor="$lime700">
          <ButtonText>{t('common:button.confirm')}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};