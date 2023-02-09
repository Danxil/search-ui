import ClickAwayListener from '@mui/base/ClickAwayListener';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import type {
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
} from '@mui/base/SelectUnstyled';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import React, { useRef, useState } from 'react';

import styles from './styles.module.css';

const Button = React.forwardRef(function Button<TValue extends {}>(
  props: SelectUnstyledRootSlotProps<TValue> & {
    closeListbox: () => void;
    btnClassName?: string;
  },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, closeListbox, btnClassName, ...other } = props;

  const onClick = useRef((e: React.MouseEvent<HTMLElement>) => {
    closeListbox();
    other.onClick(e);
  }).current;

  return (
    <button
      type="button"
      {...other}
      ref={ref}
      onClick={onClick}
      className={`${styles.btn} ${btnClassName}`}
    >
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const StyledListbox = React.forwardRef(function Button<TValue extends {}>(
  props: SelectUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { ownerState, ...other } = props;
  return <ul {...other} className={styles.options} ref={ref} />;
});

export const Option = OptionUnstyled;

const StyledPopper = PopperUnstyled;

export default React.forwardRef(function CustomSelect<TValue extends {}>(
  props: SelectUnstyledProps<TValue> & { btnClassName?: string },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const [listboxOpen, setListboxOpen] = useState(false);

  const slots = useRef({
    root: Button,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  }).current;

  const onListboxOpenChange = useRef(() => {
    setListboxOpen(true);
  }).current;

  const closeListbox = useRef(() => setListboxOpen(false)).current;

  const slotProps = useRef({
    root: {
      closeListbox,
      btnClassName: props.btnClassName,
    },
  }).current;

  return (
    <ClickAwayListener onClickAway={closeListbox}>
      <SelectUnstyled
        {...props}
        ref={ref}
        slots={slots}
        slotProps={slotProps}
        listboxOpen={listboxOpen}
        onListboxOpenChange={onListboxOpenChange}
      />
    </ClickAwayListener>
  );
});
