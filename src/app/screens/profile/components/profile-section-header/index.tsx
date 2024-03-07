import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, EditIcon, Text } from '@gluestack-ui/themed';

import { ProfileSectionProps } from './types';

export const ProfileSectionHeader: FC<ProfileSectionProps> = ({
  title,
  onEditPress,
}) => (
  <Box flexDirection="row" justifyContent="space-between" alignItems="center">
    <Box flex={1} ml="$7">
      <Text color="$textDark950" textAlign="center">
        {title}
      </Text>
    </Box>

    <TouchableOpacity onPress={onEditPress}>
      <EditIcon mr="$2.5" color="$green700" />
    </TouchableOpacity>
  </Box>
);
