import Alert from '@mui/material/Alert';
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

const ALIGN: SnackbarOrigin = { vertical: 'top', horizontal: 'center' };

const CirteriaUpdateAlert = ({ watch }: { watch: unknown }) => {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const handleOpen = useRef(() => {
    setOpen(true);
  }).current;
  
  const handleClose = useRef((event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  }).current;

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);

      return;
    }

    if (!watch) return;

    handleOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch])

  return(
    <Snackbar
      anchorOrigin={ALIGN}
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert severity="info">
          Data loaded
      </Alert>
    </Snackbar>
  )
}

export default React.memo(CirteriaUpdateAlert);