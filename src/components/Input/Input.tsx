import React from 'react';
import { Input as BaseInput, SIZE,InputProps } from 'baseui/input';


const Input:React.FC<InputProps> = ({ ...props }) => {
  return (
    <BaseInput
      overrides={{
        Input: {
          style: ({ $theme }) => ({
            color:'#161F6A !important' ,
            ...$theme.typography.ParagraphMedium,
          }),
        },
        Root:{
          style:({$theme,$isFocused})=>({
              borderBottomColor:$isFocused?$theme.colors.positive300:'#EEEEEE',
              borderTopColor:$isFocused?$theme.colors.positive300:'#EEEEEE',
              borderRightColor:$isFocused?$theme.colors.positive300:'#EEEEEE',
              borderLeftColor:$isFocused?$theme.colors.positive300:'#EEEEEE',
          })
        }
      }}
      {...props}
    />
  );
};

export { SIZE };
export default Input;
