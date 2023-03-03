import type { SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import type { ComponentProps } from 'react';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import type { InputBaseProps } from '@mui/material/InputBase';
import InputBase from '@mui/material/InputBase';
import React from 'react';

import styles from './styles.module.css';

export const Option = ({ children, ...props }: ComponentProps<typeof MenuItem>) => (
  <MenuItem {...props}><div className={styles.option}>{children}</div></MenuItem>
);

const Button = (
  { btnClassName, ...props }: InputBaseProps & Pick<ComponentProps<typeof CustomSelect>, 'btnClassName'>
) => (
  <InputBase
    {...props}
    classes={{ input: styles.input}}
    slots={{
      root: (props) => <div className={`${styles.btn} ${btnClassName}`}>{props.children}<UnfoldMoreRoundedIcon/></div>
    }}
  />
);


const CustomSelect = function CustomSelect(
  { value, onChange, btnClassName, children, name }: SelectProps & { btnClassName?: string }) {

  return (
    <Select
      name={name}
      input={<Button btnClassName={btnClassName} value={value} />}
      onChange={onChange} 
    >
      {children}
    </Select>
  );
};

export default React.memo(CustomSelect);
