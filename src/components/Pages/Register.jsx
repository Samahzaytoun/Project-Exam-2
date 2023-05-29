import { Alert, Box, Checkbox, FormControlLabel, Snackbar, TextField, Typography } from '@mui/material';
import useForm from '../../hooks/useForm';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { FeedbackContext } from '../../contexts/FeedbackProvider';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(32, 'Name must be at most 32 characters')
    .test({
      // must only contain underscores, letters and numbers
      message: 'Name must only contain letters, numbers and underscores',
      test: (value) => {
        if (value) {
          return /^[a-zA-Z0-9_]*$/.test(value);
        }
        return true;
      },
    }),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required')
    .test({
      message: 'Email must be a valid @stud.noroff.no or @noroff.no email',
      test: (value) => {
        if (value) {
          return value.includes('@stud.noroff.no') || value.includes('@noroff.no');
        }
        return true;
      },
    }),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  avatar: yup.string().url('Avatar must be a valid URL'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  avatar: '',
  venueManager: false,
};

export default function Register() {
  const { input, handleSubmit, checkbox } = useForm(initialValues, onSubmit, validationSchema);
  const { register, loading, user } = useContext(UserContext);
  const { setSuccess } = useContext(FeedbackContext);
  const navigate = useNavigate();

  async function onSubmit(values) {
    const data = await register(values);
    if (data) {
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }

  if (!loading && user && !success) {
    return (
      <Box className='w-full mt-24 rounded-2xl bg-neutral-800 p-6 lg:p-12 lg:w-2/3 xl:w-1/2 mx-auto'>
        <Typography variant='h4' className='!mb-5'>
          You are already logged in
        </Typography>

        <Link to={'/'}>Back to home</Link>
      </Box>
    );
  }

  return (
    <Fragment>
      <div className='container'>
        <Box className='w-full mt-24 rounded-2xl  lg:w-2/3 xl:w-1/2 mx-auto'>
          <Typography variant='h5' className='!mb-5'>
            Register
          </Typography>

          <form onSubmit={handleSubmit} className='w-full space-y-4' autoComplete='off'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <TextField {...input('name')} className='w-full' />
              <TextField {...input('email', 'email')} className='w-full' />
            </div>
            <TextField {...input('password', 'password')} className='w-full' />
            <TextField {...input('avatar')} className='w-full' />
            <FormControlLabel {...checkbox('venueManager')} className='!block' control={<Checkbox />} />

            <div className='flex items-center gap-3'>
              <LoadingButton loading={loading} type='submit' variant='contained'>
                Register
              </LoadingButton>

              <Typography>
                <Link to='/login' className='!underline'>
                  Already have an account? Login
                </Link>
              </Typography>
            </div>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}
