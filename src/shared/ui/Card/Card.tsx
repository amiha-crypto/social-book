import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
  children: ReactNode;
}

export function Card({ as = 'div', className = '', children, ...rest }: CardProps) {
  const Component = as;
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
