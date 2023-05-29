import { Box, TextField, Typography } from '@mui/material';
import useForm from '../../hooks/useForm';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserProvider'; 
import LoadingButton from '@mui/lab/LoadingButton';
import { FeedbackContext } from '../../contexts/FeedbackProvider';

const validationSchema = yup.object({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const { input, handleSubmit } = useForm(initialValues, onSubmit, validationSchema);
  const { login, loading, user } = useContext(UserContext);
  const { setSuccess } = useContext(FeedbackContext);
  const [newLogin, setNewLogin] = useState(false);

  async function onSubmit(values) {
    const data = await login(values);

    if (data) {
      setNewLogin(true);
      setSuccess('Logged in successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }

  if (newLogin) {
    return (
      <Box className='w-full mt-24 rounded-2xl bg-neutral-800 p-6 lg:p-12 lg:w-2/3 xl:w-1/2 mx-auto'>
        <Typography variant='h4' className='!mb-5'>
          Login successful
        </Typography>
      </Box>
    );
  }

  if (!loading && user) {
    return (
      <Box className='w-full mt-24 rounded-2xl bg-neutral-800 p-6 lg:p-12 lg:w-2/3 xl:w-1/2 mx-auto'>
        <Typography variant='h4' className='!mb-5'>
          You are already logged in
        </Typography>

        <Link to='/'>Back to home</Link>
      </Box>
    );
  }

  return (
    <Fragment>
      <div className='container '>
        <Box className='w-full mt-24 rounded-2xl lg:w-2/3 xl:w-1/2 mx-auto'>
          <Typography variant='h4' className='!mb-5'>
            Login
          </Typography>

          <form onSubmit={handleSubmit} className='w-full space-y-8' autoComplete='off'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <TextField variant='standard' {...input('email', 'email')} className='w-full' />
              <TextField variant='standard' {...input('password', 'password')} className='w-full' />
            </div>

            <div className='flex items-center gap-4'>
              <LoadingButton loading={loading} type='submit' variant='contained'>
                Login
              </LoadingButton>

              <Typography>
                <Link to='/register' className='!underline'>
                  Register if you don&apos;t have an account
                </Link>
              </Typography>
            </div>
          </form>
        </Box>
      </div>
    </Fragment>
  );
}
