import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import HeaderUserArea from './UserArea';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function Header() {
  const { user, logout, setUser } = useContext(UserContext);

  const isVenueManager = user?.venueManager;

  return (
    <header className='bg-neutral-900  py-3'>
      <div className='container flex items-center text-white justify-between mt-2'>
        <Link to='/' className='text-center block'>
          <Logo />
        </Link>
        <div className='flex items-center gap-12'>
          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
              {isVenueManager ? (
                <>
                  <Link to='/new-venue'>New Venue</Link>
                  <Link to='/my-venues'>My Venues</Link>
                </>
              ) : (
                <Link to='/my-bookings'>My Bookings</Link>
              )}
            </Box>
          )}

          <HeaderUserArea user={user} setUser={setUser} logout={logout} />
        </div>
      </div>
    </header>
  );
}
