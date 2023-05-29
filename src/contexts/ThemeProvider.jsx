import { ThemeProvider as _ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.3rem',
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'dark',
  },
});

export default function ThemeProvider({ children }) {
  return (
    <_ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </_ThemeProvider>
  );
}
