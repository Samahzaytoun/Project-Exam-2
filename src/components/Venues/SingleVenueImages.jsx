export default function SingleVenueImages({ images }) {
  if (typeof images === 'string') {
    return (
      <a key={`firstimage`} href={images[0]} target='_blank' rel='noreferrer'>
        <img src={images} className='w-full  rounded-md object-cover' />
      </a>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <a key={`firstimages`} href={images[0]} target='_blank' rel='noreferrer'>
        <img src={images[0]} className='w-full aspect-video rounded-md object-cover' />
      </a>
      <div className='grid grid-cols-5 gap-3'>
        {images.slice(1, 4).map((image, i) => (
          <a key={`image${i}`} href={image} target='_blank' rel='noreferrer'>
            <img src={image} className='w-full aspect-video rounded-md object-cover' />
          </a>
        ))}
      </div>
    </div>
  );
}
