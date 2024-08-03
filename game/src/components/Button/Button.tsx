import { cloneElement, FC, ReactElement, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './Button.module.scss';
import { NativeProps } from '../types';

export type ButtonProps = {
  shape?: 'rect' | 'circle';
  disabled?: boolean;
  asChild?: ReactElement;
  variant?: 'contained' | 'outlined' | 'text';
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} & NativeProps<'--width'>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    asChild,
    shape = 'rect',
    disabled,
    endIcon,
    startIcon,
    variant = 'contained',
    style,
  } = props;

  const childrenToRender = (
    <span className={styles.inner}>
      {!endIcon && startIcon}
      {children && <span>{children}</span>}
      {!startIcon && endIcon}
    </span>
  );

  const p = {
    style,
    children: childrenToRender,
    className: clsx(styles.root, styles[variant], styles[shape], { [styles.disabled]: disabled }),
  };

  if (asChild) {
    return cloneElement(asChild, p);
  }

  return <button type="button" {...p} />;
};
