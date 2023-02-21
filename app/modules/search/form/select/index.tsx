import type {
  SelectUnstyledProps,
} from '@mui/base/SelectUnstyled';
import Select from '@mui/material/Select';
import type { ComponentProps } from 'react';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import type { InputBaseProps } from '@mui/material/InputBase';
import InputBase from '@mui/material/InputBase';

import styles from './styles.module.css';

export const Option = MenuItem;

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


const CustomSelect = function CustomSelect<TValue extends {}>(
  { defaultValue, btnClassName, children, name }: SelectUnstyledProps<TValue> & { btnClassName?: string }) {

  return (
    <Select
      name={name}
      input={<Button btnClassName={btnClassName} defaultValue={defaultValue} />}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
