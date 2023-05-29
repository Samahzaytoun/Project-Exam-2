import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import useIsVenueManager from '../../hooks/useIsVenueManager';
import * as yup from 'yup';
import { Fragment, useContext } from 'react';
import useForm from '../../hooks/useForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { venueRequests } from '../../utils/requests';
import { FeedbackContext } from '../../contexts/FeedbackProvider';
import VenueImagesForm from '../Venues/VenueImagesForm';
import Map from '../Venues/VenueMapForm';

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

export default function EditVenue() {
  useIsVenueManager();
  const { id } = useParams();
  const { setError, setSuccess } = useContext(FeedbackContext);
  const {
    data: existingVenue,
    isLoading: existingLoading,
    isError,
  } = useQuery(['venues', id], () => venueRequests.getSingleVenue(id));
  const { input, handleSubmit, values, setValues, checkbox } = useForm(existingVenue || {}, onSubmit, validationSchema);
  const { mutate, isLoading } = useMutation(['venues', 'post'], () => venueRequests.updateVenue(values), {
    onSuccess: () => {
      setSuccess('Venue updated successfully');

      setTimeout(() => {
        setSuccess(false);
        navigate('/venues/' + existingVenue.id);
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

  if (existingLoading) return <div>Loading...</div>;

  if (!existingLoading && isError) {
    navigate('/404');
    return <Fragment></Fragment>;
  }

  if (!existingVenue) return <div></div>;

  return (
    <Fragment>
      <div className='container'>
        <Box className='w-full my-12   lg:w-3/4 xl:w-2/3 mx-auto'>
          <Typography variant='h4' className='!mb-5'>
            Edit Venue
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
              Update Venue
            </LoadingButton>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}
