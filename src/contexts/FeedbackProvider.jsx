import { Alert, Snackbar } from '@mui/material';
import { createContext, useState } from 'react';

export const FeedbackContext = createContext();

export default function FeedbackProvider({ children }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function clearFeedback() {
    setError(null);
    setSuccess(null);
  }

  return (
    <FeedbackContext.Provider value={{ setError, setSuccess, clearFeedback }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!error}
        autoHideDuration={5000}
        onClose={clearFeedback}>
        <Alert onClose={clearFeedback} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!success}
        autoHideDuration={5000}
        onClose={clearFeedback}>
        <Alert onClose={clearFeedback} severity='success' sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {children}
    </FeedbackContext.Provider>
  );
}
