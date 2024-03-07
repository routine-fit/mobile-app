import React, { FC } from 'react';
import { Box, Text } from '@gluestack-ui/themed';

import { InfoBoxProps } from './types';

export const InfoBox: FC<InfoBoxProps> = ({ value, label }) => {
  return (
    <Box gap="$1" marginVertical="$1.5">
      <Text color="$textDark950">{value}</Text>
      <Text size="xs">{label}</Text>
    </Box>
  );
};
