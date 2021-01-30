import React from 'react';
import { Checkbox as BaseCheckbox, CheckboxProps } from 'baseui/checkbox';
export { STYLE_TYPE } from 'baseui/checkbox';

export const LABEL_PLACEMENT = Object.freeze({
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
});

const Checkbox:React.FC<CheckboxProps> = ({ ...props }) => {
  return <BaseCheckbox
          {...props}
          overrides={{
            Checkmark: {
              style:({$theme,$checked})=>({
                borderTopWidth: '2px',
                borderRightWidth: '2px',
                borderBottomWidth: '2px',
                borderLeftWidth: '2px',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                borderBottomLeftRadius: '4px',
                backgroundColor:$checked?$theme.colors.positive300:$theme.colors.white,
                ":hover":{
                  backgroundColor:$checked?$theme.colors.positive300:$theme.colors.backgroundSecondary
                },
               
              }),
            },
          }}
        />;
};

export default Checkbox;
