import { useQuery } from '@tanstack/react-query';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import MyBookingsSkeleton from '../Bookings/MyBookingsSkeleton';
import MyBookingsList from '../Bookings/MyBookingsList';
import { bookingRequests } from '../../utils/requests';

export default function MyBookings() {
  const user = useIsLoggedIn();

  const { data, isLoading } = useQuery(['bookings'], () => bookingRequests.getBookingsByProfileName(user?.name));

  return (
    <Fragment>
      <div className='container my-6'>
        <Typography variant='h4' className='!mb-4'>
          My Bookings
        </Typography>
        {isLoading ? <MyBookingsSkeleton /> : <MyBookingsList bookings={data} />}
      </div>
    </Fragment>
  );
}
