import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import VenuesList from '../Venues/VenuesList';
import VenuesListSkeleton from '../Venues/VenuesListSkeleton';
import Hero from '../Hero';
import { venueRequests } from '../../utils/requests';

export default function Home() {
  const { data, isLoading } = useQuery(['venues'], venueRequests.getAllVenues);

  return (
    <Fragment>
      <div className='container mb-6'>
        <Hero />

        {isLoading ? <VenuesListSkeleton /> : <VenuesList venues={data} />}
      </div>
    </Fragment>
  );
}
