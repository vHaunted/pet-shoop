import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div 
      className='relative z-10 flex flex-col sm:flex-row border border-gray-400 min-h-[400px] mt-4'
      style={{ 
        backgroundImage: `url(${assets.header})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '40px'
      }}
    >
      {/* Затемнення фону */}
      <div className='absolute inset-0 bg-black/20'
        style={{borderRadius:'40px'}}></div>

      {/* Hero left side */}
      <div className='relative z-10 w-full sm:w-1/2 flex sm:py-0'>
        <div className='text-[white] p-6 rounded-lg'>
            <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Найкраща якість для ваших улюбленців!</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;