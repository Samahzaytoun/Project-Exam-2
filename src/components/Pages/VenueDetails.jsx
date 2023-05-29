import { Button, Chip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';
import LoginIcon from '@mui/icons-material/Login';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import PeopleIcon from '@mui/icons-material/People';

import { BookOnline } from '@mui/icons-material';
import { venueRequests } from '../../utils/requests';
import BookVenue from '../BookVenue';
import SingleVenueImages from '../Venues/SingleVenueImages';
import VenueOwnerDetails from '../Venues/VenueOwnerDetails';
import VenueMetaInfo from '../Venues/VenueMetaInfo';
import VenueBookings from '../Venues/VenueBookings';

export default function VenueDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(['venue', id], () => venueRequests.getSingleVenue(id), { enabled: !!id });
  const [isBooking, setIsBooking] = useState(false);

  const { user } = useContext(UserContext);

  if (isLoading)
    return (
      <div className='container text-center mt-12'>
        <Typography variant='h4'>Loading...</Typography>
      </div>
    );

  if (!isLoading && (!data || error)) {
    return (
      <div className='container text-center mt-12'>
        <Typography variant='h4'>No venue found</Typography>
      </div>
    );
  }

  return (
    <Fragment>
      <div className='container  my-12'>
        <div className=' flex flex-col gap-4'>
          <Typography variant='h5' fontWeight={700}>
            {data?.name}
          </Typography>

          <SingleVenueImages images={data?.media} />

          <VenueOwnerDetails data={data} />

          <div className='flex gap-2 mt-auto'>
            <Chip
              icon={<AttachMoneyIcon />}
              className='font-bold'
              variant='outlined'
              color='success'
              label={data?.price}
            />
            <Chip icon={<GradeIcon />} className='font-bold' label={data?.rating} />
            <Chip icon={<PeopleIcon />} className='font-bold' label={data?.maxGuests} />
          </div>

          <VenueMetaInfo data={data} />

          {user ? (
            !user?.venueManager ? (
              <div>
                <Button
                  size='large'
                  startIcon={<BookOnline />}
                  color='success'
                  variant='contained'
                  onClick={() => setIsBooking(!isBooking)}>
                  Book Venue
                </Button>
              </div>
            ) : data?.bookings?.length > 0 && data?.owner?.name === user?.name ? (
              <VenueBookings data={data} />
            ) : (
              <Fragment />
            )
          ) : (
            <div>
              <Link to='/login'>
                <Button variant='outlined' endIcon={<LoginIcon />}>
                  Login to book venue
                </Button>
              </Link>
            </div>
          )}

          <BookVenue isOpen={isBooking} setIsOpen={setIsBooking} id={id} bookedDates={data?.bookings} />

          <Typography variant='body1'>{data?.description}</Typography>
        </div>
      </div>
    </Fragment>
  );
}
