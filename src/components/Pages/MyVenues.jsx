import { useQuery } from '@tanstack/react-query';

import { Fragment } from 'react';
import { Typography } from '@mui/material';
import VenuesListSkeleton from '../Venues/VenuesListSkeleton';
import VenuesList from '../Venues/VenuesList';
import { venueRequests } from '../../utils/requests';
import useIsVenueManager from '../../hooks/useIsVenueManager';

export default function MyVenues() {
  const user = useIsVenueManager('/');
  const { data, isLoading } = useQuery(
    ['venues', user?.venueManager],
    () => venueRequests.getVenuesByProfileName(user?.name),
    {
      enabled: !!user,
    }
  );

  return (
    <Fragment>
      <div className='container my-6'>
        <Typography variant='h4'>{user?.name} Venues</Typography>

        {isLoading ? <VenuesListSkeleton /> : <VenuesList owner venues={data} />}
      </div>
    </Fragment>
  );
}
