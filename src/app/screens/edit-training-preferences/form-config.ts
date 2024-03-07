import { t } from 'i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormData = {
  trainingType: string;
  trainingTime: string;
  trainingIntensity: string;
  trainingGoals: string;
};

export const validationSchema = yup.object().shape({
  trainingType: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingType').toLowerCase(),
    }),
  ),
  trainingTime: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingTime').toLowerCase(),
    }),
  ),
  trainingIntensity: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingIntensity').toLowerCase(),
    }),
  ),
  trainingGoals: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingGoals').toLowerCase(),
    }),
  ),
});

export const formConfig = {
  defaultValues: {
    trainingType: '',
    trainingTime: '',
    trainingIntensity: '',
    trainingGoals: '',
  },
  resolver: yupResolver(validationSchema),
};
