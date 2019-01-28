import React from 'react';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  loading?: boolean;
}

// tslint:disable-next-line:variable-name
export const Button: React.SFC<ButtonProps> = ({
  className,
  disabled,
  outline,
  loading,
  children
}) => {
  return <button
    disabled={outline || loading}
    className={`${className || ''} ${outline ? 'outline' : ''}`}
  >{children}</button>;
};
