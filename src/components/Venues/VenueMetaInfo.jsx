import { Check, Close } from '@mui/icons-material';
import { Chip } from '@mui/material';

export default function VenueMetaInfo({ data }) {
  const getIcon = (bool) => (bool ? <Check /> : <Close />);

  return (
    <div className='flex items-center gap-4'>
      <Chip
        variant='outlined'
        className='!border-none'
        icon={getIcon(data?.meta?.wifi)}
        label={data?.meta?.wifi ? 'Has Wifi' : 'No Wifi'}
      />
      <Chip
        variant='outlined'
        className='!border-none'
        icon={getIcon(data?.meta?.parking)}
        label={data?.meta?.parking ? 'Has Parking' : 'No Parking'}
      />
      <Chip
        variant='outlined'
        className='!border-none'
        icon={getIcon(data?.meta?.pets)}
        label={data?.meta?.pets ? 'Allows Pets' : 'No Pets'}
      />
      <Chip
        variant='outlined'
        className='!border-none'
        icon={getIcon(data?.meta?.breakfast)}
        label={data?.meta?.breakfast ? 'Includes Breakfast' : 'No Breakfast'}
      />
    </div>
  );
}
