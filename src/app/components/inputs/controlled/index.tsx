import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';

import { ControlledInputProps } from './types';

const ControlledInput = <Form extends FieldValues>({
  controller,
  inputProps = {},
  inputFieldProps = {},
  formControlProps = {},
}: ControlledInputProps<Form>) => {
  const { field, fieldState } = useController(controller);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  return (
    <FormControl
      {...formControlProps}
      isInvalid={fieldState.invalid}
      isRequired={formControlProps.isRequired || !!controller.rules?.required}
    >
      <FormControlLabel>
        {label && <FormControlLabelText>{label}</FormControlLabelText>}
      </FormControlLabel>
      <Input
        {...inputProps}
        sx={{
          ':focus': {
            borderColor: '$lime700',
          },
        }}
      >
        <InputField
          autoCapitalize="none"
          autoComplete="off"
          placeholder={placeholder}
          {...inputFieldProps}
          onChangeText={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
        />
      </Input>
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default ControlledInput;
