import { Avatar, Typography } from '@mui/material';

export default function VenueOwnerDetails({ data }) {
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='flex gap-2 items-center'>
        <Avatar
          alt={data?.owner?.name}
          src={data?.owner?.avatar}
          sx={{
            width: 48,
            height: 48,
          }}
        />

        <div className='flex flex-col'>
          <Typography>{data.owner.name}</Typography>
          <Typography variant='caption' className='text-gray-300'>
            {data.owner.email}
          </Typography>
        </div>
      </div>
    </div>
  );
}
