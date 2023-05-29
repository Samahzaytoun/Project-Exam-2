import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function HeaderUserArea({ user, logout }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {user ? (
        <Fragment>
          <Tooltip title='User'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src={user?.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: 2 }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            <MenuItem>
              <Link to='/my-profile'>My Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Link to='/my-bookings'>My Bookings</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={logout} textAlign='center'>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Fragment>
      ) : (
        <div className='flex justify-center '>
          <div className='hidden lg:flex gap-2'>
            <Link to='/login'>
              <Button variant='contained' startIcon={<LoginIcon />}>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button variant='' endIcon={<HowToRegIcon />}>
                Register
              </Button>
            </Link>
          </div>

          <div className='block lg:hidden'>
            <Tooltip title='User'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 2 }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/login'>
                  <Typography textAlign='center'>Login</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/register'>
                  <Typography textAlign='center'>Register</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </Box>
  );
}
