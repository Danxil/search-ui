import clsx from 'clsx'
import type { UseSwitchParameters } from '@mui/base/SwitchUnstyled';
import { useSwitch } from '@mui/base/SwitchUnstyled'
import type {HTMLProps} from 'react';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

import styles from './styles.module.css';

const SwitchRoot = (
  props: React.HTMLProps<HTMLInputElement>,
) => (<span {...props} /> );

const SwitchTrack = (
  props: React.HTMLProps<HTMLInputElement>,
) => (<span {...props} /> );

const SwitchThumb = (
  props: React.HTMLProps<HTMLInputElement>,
) => (<span {...props}><ArrowDownwardIcon className={styles.downIcon} /><ArrowUpward className={styles.upIcon} /></span> );

const SwitchInput = React.forwardRef(function SwitchRoot(
  props: React.HTMLProps<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) { return  <input {...props} ref={ref} /> });

const Switch = (
  { name, value, ...props }: UseSwitchParameters & HTMLProps<HTMLInputElement>,
) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch({ ...props });

  const stateClasses = {
    [styles.checked]: checked,
    [styles.disabled]: disabled,
    [styles.focusVisible]: focusVisible,
  };

  return (
    <SwitchRoot className={`${styles.root} ${clsx(stateClasses)}`}>
      <SwitchTrack className={`${styles.track}`}>
        <SwitchThumb className={`${styles.thumb} ${clsx(stateClasses)}`} />
      </SwitchTrack>
      <SwitchInput className={`${styles.input}`} {...getInputProps()} name={name} value={value} />
    </SwitchRoot>
  )
};

export default Switch;