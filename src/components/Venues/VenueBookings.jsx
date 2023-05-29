import { Chip, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import dayjs from 'dayjs';

export default function VenueBookings({ data }) {
  return (
    <div className='my-6'>
      <Typography variant='h6'>Bookings</Typography>
      {data?.bookings.map((booking) => (
        <div className='bg-neutral-900 p-4 rounded-2xl' key={booking?.id}>
          <div className='flex items-center gap-2'>
            <span>From</span>
            <Typography fontWeight={700}>{dayjs(booking?.dateFrom).format('DD MMM YYYY')}</Typography>
            <span>To</span>
            <Typography fontWeight={700}>{dayjs(booking?.dateTo).format('DD MMM YYYY')}</Typography>

            <Chip
              variant='outlined'
              icon={<PeopleIcon />}
              className='font-bold !bg-neutral-800'
              label={booking?.guests + ' Guest(s)'}
            />
          </div>

          <Typography variant='caption'>Booked on {dayjs(booking?.createdAt).format('DD MMM YYYY')}</Typography>
        </div>
      ))}
    </div>
  );
}
