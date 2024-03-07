import React, { FC, useState } from 'react';
import {
  Box,
  EyeIcon,
  EyeOffIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';

import { PasswordReadOnlyProps } from './types';

export const PasswordReadOnly: FC<PasswordReadOnlyProps> = ({ value }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  return (
    <Box>
      <Input variant="underlined" size="md" isReadOnly={true} width={'auto'}>
        <InputField
          placeholder={'test'}
          type={showPassword ? 'text' : 'password'}
          value={value}
        />
        <InputSlot marginRight={16} onPress={handleState}>
          <InputIcon
            as={showPassword ? <EyeIcon /> : <EyeOffIcon />}
            color="$textDark950"
          />
        </InputSlot>
      </Input>
    </Box>
  );
};
