import { ReactNode } from 'react';

export interface HeaderProps {
  leftText?: string | ((props: any) => ReactNode) | undefined;
  headerLeft?: React.ReactNode;
  headerTitle?: string | ((props: any) => ReactNode) | undefined;
  rightText?: string;
  rightButton?: React.ReactNode;
  onPressLeft?: () => void;
}
