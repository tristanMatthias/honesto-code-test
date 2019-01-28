import React from 'react';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  loading?: boolean;
  onClick?(): void;
}

// tslint:disable-next-line:variable-name
export const Button: React.SFC<ButtonProps> = ({
  className,
  disabled,
  outline,
  loading,
  children,
  onClick
}) => {
  return <button
    disabled={loading}
    className={`${className || ''} ${outline ? 'outline' : ''}`}
    onClick={disabled ? null : onClick}
  >{children}</button>;
};
