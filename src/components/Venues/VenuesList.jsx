import { Fragment, useContext, useState } from 'react';
import VenueCard from './VenueCard';
import { InputAdornment, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { UserContext } from '../../contexts/UserProvider';

export default function VenuesList({ owner = false, venues }) {
  const [search, setSearch] = useState('');
  const { user } = useContext(UserContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchedVenues = venues.filter((venue) => venue?.name?.toLowerCase()?.includes(search?.toLowerCase()));

  return (
    <Fragment>
      <div className='text-center'>
        <TextField
          variant='outlined'
          value={search}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          label='Search for venues'
          className='!my-4 lg:w-1/2 w-full'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {searchedVenues && searchedVenues.length > 0 ? (
          searchedVenues.map((venue) => (
            <VenueCard key={venue?.id} venue={venue} owner={owner || venue?.owner?.name === user?.name} />
          ))
        ) : (
          <div className='text-center col-span-full'>
            <p>No venues found</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}
