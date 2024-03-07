export interface SharedModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  body: React.JSX.Element;
  footer?: React.JSX.Element;
}
