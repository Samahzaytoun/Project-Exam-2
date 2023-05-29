import Close from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

const VenueImagesForm = ({ values, setValues }) => {
  const [image, setImage] = useState('');

  const handleAddImage = useCallback(() => {
    if (!image) return;
    setValues((values) => {
      return {
        ...values,
        media: [...values.media, image],
      };
    });
    setImage('');
  }, [image, setValues]);

  const handleRemoveImage = useCallback(
    (index) => {
      setValues((values) => {
        return {
          ...values,
          media: values.media.filter((_, i) => i !== index),
        };
      });
    },
    [setValues]
  );

  return (
    <div className='space-y-4'>
      <div className='flex space-x-4'>
        <TextField
          value={image}
          onChange={(e) => setImage(e.target.value)}
          label='Image URL'
          variant='outlined'
          className='flex-grow'
        />

        <Button onClick={handleAddImage} variant='outlined' color='secondary'>
          Add Image
        </Button>
      </div>
      <Typography variant='caption'>First image will become thumbnail</Typography>
      <div className='grid grid-cols-3 gap-4'>
        {values?.media?.map((image, index) => (
          <div key={index} className='relative'>
            <img src={image} alt='' className='w-full bg-red-300 ' />

            <IconButton
              onClick={() => handleRemoveImage(index)}
              aria-label='delete'
              className='!absolute top-0 !border-none right-0 !bg-red-500  !text-white rounded-full w-8 h-8 flex justify-center items-center'>
              <Close />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueImagesForm;
