import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventImageSlider.css';

function EventImageSlider({pictures}) {
  console.log(pictures);
  const images = [
    'https://picsum.photos/900/400?random=1',
    'https://picsum.photos/900/400?random=2',
    'https://picsum.photos/900/400?random=3',
    'https://picsum.photos/900/400?random=4',
    'https://picsum.photos/900/400?random=5',
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 2000); // Change image every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
  
      < > {/* Use offset-md-1 */}
        <Slider {...settings} ref={sliderRef}>
          {pictures.map((image, index) => (
            <div key={index}>
              <img src={image.image_path} alt={`Slide ${index}`} className='w-50 h-100' />
            </div>
          ))}
        </Slider>
      </>
    
  );
}

export default EventImageSlider;
