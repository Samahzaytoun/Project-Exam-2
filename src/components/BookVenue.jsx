import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackContext } from '../contexts/FeedbackProvider';
import { bookingRequests } from '../utils/requests';
import dayjs from 'dayjs';
import useForm from '../hooks/useForm';
import * as yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

const initialValues = {
  venueId: '',
  guests: 1,
  dateFrom: dayjs(new Date()),
  dateTo: dayjs(new Date()).add(2, 'day'),
};
export default function BookVenue({ isOpen, setIsOpen, id, bookedDates }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setError, setSuccess } = useContext(FeedbackContext);

  const { input, values, setValues } = useForm(
    {
      ...initialValues,
      venueId: id,
    },
    onSubmit,
    yup.object({
      guests: yup
        .number()
        .required('Guests is required')
        .min(1, 'Guests must be at least 1')
        .max(100, 'Guests must be at most ' + 100),
    })
  );
  const { mutate, isLoading } = useMutation(['bookings', 'post'], () => bookingRequests.bookVenue(values), {
    onSuccess: () => {
      setSuccess('Successfully booked');
      queryClient.invalidateQueries('bookings');

      setTimeout(() => {
        setSuccess(false);
        navigate('/my-bookings');
      }, 2000);
    },
    onError: (e) => {
      setError(e?.response?.data?.errors?.[0].message);
    },
  });

  async function onSubmit(values) {
    mutate(values);
  }

  return (
    <Fragment>
      {isOpen && (
        <div className='bg-neutral-900 p-6 rounded-xl'>
          <Typography variant='h5' mb={3}>
            Book Venue
          </Typography>
          <div>
            <TextField className='!mb-4 !mt-2' {...input('guests', 'number')} variant='outlined' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangeCalendar
                shouldDisableDate={(day) => {
                  const dates = [];

                  bookedDates?.forEach((booking) => {
                    const start = dayjs(booking.dateFrom);
                    const end = dayjs(booking.dateTo);
                    const diff = end.diff(start, 'day');

                    for (let i = 0; i <= diff; i++) {
                      dates.push(start.add(i, 'day'));
                    }
                  });

                  return dates.some((disabledDate) => dayjs(day).isSame(disabledDate, 'day'));
                }}
                className='flex !flex-col lg:!flex-row'
                value={[values.dateFrom, values.dateTo]}
                minDate={dayjs(new Date())}
                onChange={(val) =>
                  setValues({
                    ...values,
                    dateFrom: val[0],
                    dateTo: val[1],
                  })
                }
              />
            </LocalizationProvider>
          </div>
          <div className='space-x-4'>
            <Button onClick={() => setIsOpen(false)} color='error'>
              Close
            </Button>
            <LoadingButton variant='contained' loading={isLoading} onClick={mutate}>
              Book
            </LoadingButton>
          </div>
        </div>
      )}
    </Fragment>
  );
}
