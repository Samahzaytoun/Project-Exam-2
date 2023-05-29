import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Chip, IconButton, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { venueRequests } from '../../utils/requests';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function VenueCard({ venue, owner }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(['venues', venue?.id], () => venueRequests.deleteVenue(venue?.id), {
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
    },
  });
  return (
    <Fragment>
      <Link
        to={`/venues/${venue?.id}`}
        className='flex flex-col md:flex-row rounded-md group bg-neutral-900 overflow-hidden'>
        <div className='h-[50vw] sm:h-[300px] md:h-[210px] lg:h-[160px] lg:w-[200px] 2xl:h-[230px] 2xl:w-[330px] md:w-[250px] overflow-hidden'>
          <img
            src={venue?.media[0]}
            className=' group-hover:scale-105 transition pointer-events-none h-full w-full object-cover'
          />
        </div>
        <div className='p-4 flex flex-col  flex-1'>
          <Typography className='line-clamp-1' fontWeight={600}>
            {venue?.name}
          </Typography>
          <Typography className='line-clamp-3 text-neutral-300 !mb-2'>{venue?.description}</Typography>

          <div className='flex items-center gap-2 mt-auto'>
            <Chip icon={<AttachMoneyIcon />} className='font-bold' color='success' label={venue?.price} />
            <Chip icon={<GradeIcon />} className='font-bold' label={venue?.rating} />
            <Chip icon={<PeopleIcon />} className='font-bold' label={venue?.maxGuests} />

            {owner && (
              <div className='flex ml-auto'>
                <IconButton color='error' aria-label='delete' onClick={mutate}>
                  <DeleteIcon />
                </IconButton>
                <Link to={`/edit-venue/${venue?.id}`}>
                  <IconButton color='warning' aria-label='update'>
                    <EditIcon />
                  </IconButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Fragment>
  );
}
