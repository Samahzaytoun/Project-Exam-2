import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import useIsVenueManager from '../../hooks/useIsVenueManager';
import * as yup from 'yup';
import { Fragment, useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import VenueImagesForm from '../Venues/VenueImagesForm';
import Map from '../Venues/VenueMapForm';
import { FeedbackContext } from '../../contexts/FeedbackProvider';
import { venueRequests } from '../../utils/requests';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').max(255, 'Name must be at most 255 characters'),
  description: yup.string().required('Description is required').max(500, 'Description must be at most 500 characters'),
  media: yup.array().of(yup.string().url('Media must be a valid URL')).required('Media is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be at least 0'),
  maxGuests: yup
    .number()
    .required('Max guests is required')
    .min(1, 'Max guests must be at least 1')
    .max(100, 'Max guests must be at most 100'),
});

const initialValues = {
  name: '',
  description: '',
  media: [],
  price: 0,
  maxGuests: 1,
  rating: 0,
  meta: {
    wifi: false,
    parking: false,
    pets: false,
    breakfast: false,
  },
  location: {
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    lat: 0,
    lng: 0,
  },
};

export default function NewVenue() {
  useIsVenueManager();
  const { input, handleSubmit, values, setValues, checkbox } = useForm(initialValues, onSubmit, validationSchema);
  const { setError, setSuccess } = useContext(FeedbackContext);
  const { mutate, isLoading } = useMutation(['venues', 'post'], venueRequests.createVenue, {
    onSuccess: (data) => {
      setSuccess('Venue created successfully!');

      setTimeout(() => {
        setSuccess(false);
        navigate('/venues/' + data.id);
      }, 2000);
    },
    onError: (e) => {
      setError(e?.response?.data?.errors?.[0].message);
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values) {
    mutate(values);
  }

  return (
    <Fragment>
      <div className='container '>
        <Box className='w-full my-12 p-6 lg:p-12 lg:w-3/4 xl:w-2/3 mx-auto'>
          <Typography variant='h4' className='!mb-5'>
            Create a new Venue
          </Typography>

          <form onSubmit={handleSubmit} className='w-full space-y-4' autoComplete='off'>
            <TextField {...input('name')} className='w-full' />
            <TextField {...input('description')} className='w-full' />
            <VenueImagesForm values={values} setValues={setValues} />
            <div className='grid grid-cols-2 gap-4'>
              <TextField {...input('price', 'number')} className='w-full' />
              <TextField {...input('maxGuests', 'number', 'Max Guests')} className='w-full' />
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4'>
              <FormControlLabel {...checkbox('meta.wifi', 'Wifi')} className='!block' control={<Checkbox />} />
              <FormControlLabel {...checkbox('meta.parking', 'Parking')} className='!block' control={<Checkbox />} />
              <FormControlLabel {...checkbox('meta.pets', 'Pets')} className='!block' control={<Checkbox />} />
              <FormControlLabel
                {...checkbox('meta.breakfast', 'Breakfast')}
                className='!block'
                control={<Checkbox />}
              />
            </div>

            <LoadingButton loading={isLoading} type='submit' variant='contained'>
              Create Venue
            </LoadingButton>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}
