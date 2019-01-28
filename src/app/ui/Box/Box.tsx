import React from 'react';
import './box.scss';

export interface BoxProps {
  className?: string;
}
// tslint:disable-next-line:variable-name
export const Box: React.SFC<BoxProps> = ({children, className}) => {
  return <div className={`box ${className}`}>
    {children}
  </div>;
};
