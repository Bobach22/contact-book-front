import React from 'react';
import { Button as BaseButton, SIZE, SHAPE, KIND, ButtonProps } from 'baseui/button';
import { getPaddingStyles, getBorderRadiiStyles } from './Button.style';

const Button:React.FC<ButtonProps> = ({ children, overrides, ...props }) => {
  return (
    <BaseButton
      {...props}
      overrides={{
        BaseButton: {
          style: ({ $theme, $size, $shape }) => {
            return {
              ...getPaddingStyles({ $theme, $size }),
              ...getBorderRadiiStyles({ $theme, $size, $shape }),
            };
          },
        },
        ...overrides,
      }}
    >
      {children}
    </BaseButton>
  );
};

export { SIZE, SHAPE, KIND };
export default Button;
