import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputSize = 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: InputSize;
  surface?: 'surface' | 'white';
}

export function Input({
  inputSize = 'md',
  surface = 'surface',
  className = '',
  ...rest
}: InputProps) {
  const classes = [
    styles.input,
    styles[inputSize],
    surface === 'white' ? styles.white : styles.surface,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <input className={classes} {...rest} />;
}
