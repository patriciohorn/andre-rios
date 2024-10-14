import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';

export interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  target?: '_blank' | '_self'; // Optional target prop
}

const Link: React.FC<LinkProps> = ({ href, children, target = '_self', ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    </Button>
  );
};

export { Link };
