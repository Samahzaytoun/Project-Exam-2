import { Typography } from '@mui/material';

export default function Hero() {
  return (
    <div className='lg:h-[600px] h-[60vw] sm:h-[400px] xl:h-[700px]'>
      <div className='w-full absolute left-0 lg:h-[600px] h-[60vw] sm:h-[400px] xl:h-[700px]'>
        <img
          src='https://unsplash.com/photos/fSJSiczZBVQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8dmVudWV8ZW58MHx8fHwxNjgyODQ0NDA5&force=true&w=1920'
          className='w-full h-full object-cover brightness-50'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Typography variant='h4' className='!drop-shadow-md'>
            Find the perfect venue for your event
          </Typography>
        </div>
      </div>
    </div>
  );
}
