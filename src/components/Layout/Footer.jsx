import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-neutral-900 py-4'>
      <div className='container flex justify-center'>
        <Typography>&copy; Copyright Holidaze, all rights reserved</Typography>
      </div>
    </footer>
  );
}
