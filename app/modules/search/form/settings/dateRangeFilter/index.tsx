import type { DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import './styles.module.css';
import moment from 'moment';

const DateRangeFilter = ({ onChange }: { onChange: () => void }) => {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);

  const handleChange = (newValue: DateRange<Moment>) => {
    const utcValues = newValue.map(value => moment(value, 'MM/DD/YYYY').format())
    console.log(utcValues);
    setValue(utcValues as [string, string]);
  };

  const callOnChange = () => {
    // setTimout for triggering onChange when new values will be rendered in DateRangePicker inputs 
    setTimeout(() => {
      onChange();
    })
  }

  return <DateRangePicker
    value={value}
    onChange={handleChange}
    onAccept={callOnChange}
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