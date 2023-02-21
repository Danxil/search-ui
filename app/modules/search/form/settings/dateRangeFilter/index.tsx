import type { DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import type { Moment } from 'moment';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import './styles.module.css';

const DateRangeFilter = ({ onChange, initValue }: { onChange: () => void, initValue: DateRange<Moment> }) => {
  const [value, setValue] = useState<DateRange<Moment>>(initValue);

  const callOnChange = (val: typeof value) => {
    setValue(val);
    // setTimout for triggering onChange when new values will be rendered in DateRangePicker inputs 
    setTimeout(() => {
      onChange();
    })
  }

  return <DateRangePicker
    value={value}
    onChange={callOnChange}
    renderInput={(startProps, endProps) => (
      <>
        <TextField {...startProps} size='small' label='From' name='publicationDateFrom' />
        <Box sx={{ mx: 2 }}> to </Box>
        <TextField {...endProps} size='small' label='To' name='publicationDateTo' />
      </>
    )}
  />
}

export default DateRangeFilter;