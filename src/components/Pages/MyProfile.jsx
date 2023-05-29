import { profileRequests } from '../../utils/requests';
import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { UserContext } from '../../contexts/UserProvider';

export default function MyProfilePage() {
  const user = useIsLoggedIn('/');
  const { setUser } = useContext(UserContext);

  const { input, handleSubmit } = useForm(
    { avatar: user?.avatar || '' },
    async (values) => {
      const data = await profileRequests.updateProfileByName(user?.name, values);
      setUser((user) => ({ ...user, avatar: data.avatar }));
      setAvatarOpen(false);
    },
    yup.object({
      avatar: yup.string().url('Avatar must be a valid URL'),
    })
  );

  return (
    <div className='container text-center'>
      <form
        onSubmit={handleSubmit}
        className='w-full lg:w-1/2 mx-auto space-y-4 flex md:flex-row items-center flex-col md:items-start gap-6 mt-6'
        autoComplete='off'>
        <img src={user?.avatar} className='w-[200px] h-auto rounded-md' />
        <div className='flex flex-col items-start w-full gap-6'>
          <Typography variant='h5' className='!mt-0'>
            Update your profile
          </Typography>
          <TextField {...input('avatar')} className='w-full' />
          <TextField value={user?.name} label='Name' className='w-full' disabled />
          <TextField value={user?.email} label='Email' className='w-full' disabled />
          <TextField value={user?.venueManager ? 'Yes' : 'No'} label='Venue Manager' className='w-full' disabled />

          <Button type='submit' variant='contained'>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
