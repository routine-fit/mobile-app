import React, { FC } from 'react';
import {
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { SharedModalProps } from './types';

export const SharedModal: FC<SharedModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  body,
  footer,
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <VStack>
            <Heading size="lg">{title}</Heading>
            <Text size="sm">{subtitle}</Text>
          </VStack>
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
