import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Fragment, useContext } from 'react';
import useForm from '../hooks/useForm';
import * as yup from 'yup';
import { profileRequests } from '../utils/requests';
import { UserContext } from '../contexts/UserProvider';

export default function ChangeAvatarModal({ avatarOpen, setAvatarOpen }) {
  const { user, setUser } = useContext(UserContext);
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
    <Fragment>
      <Dialog open={avatarOpen} onClose={() => setAvatarOpen(false)}>
        <DialogTitle>Change Avatar</DialogTitle>
        <DialogContent>
          <TextField {...input('avatar')} className='!mt-4 !w-[350px]' />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
