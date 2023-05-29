import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import VenueDetails from './components/Pages/VenueDetails';
import MyBookings from './components/Pages/MyBookings';
import MyVenues from './components/Pages/MyVenues';
import NewVenue from './components/Pages/NewVenue';
import EditVenue from './components/Pages/EditVenue';
import MyProfilePage from './components/Pages/MyProfile';

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/venues/:id' element={<VenueDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/my-venues' element={<MyVenues />} />
          <Route path='/new-venue' element={<NewVenue />} />
          <Route path='/edit-venue/:id' element={<EditVenue />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
}
