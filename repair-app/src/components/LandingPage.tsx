import React from 'react';
import { Link } from 'react-router-dom';
import fictionSow from '../images/fictionSow.png';
import manSowing from '../images/manSowing.png';
import sowClub from '../images/sowClub.png';
import { Carousel, initTWE } from "tw-elements";
initTWE({ Carousel });


const LandingPage: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen bg-blue-200 p-6">
      <div className='flex-col mt-30 justify-center items-center border-gray-800'>
        <div className=' jus flex flex-col items-center border-2 rounded-lg bg-blue-50 border-gray-800'>
          <h1 className="text-4xl font-bold mb-4 p-4">Welcome to the Repair App</h1>
          <p className="text-xl mb-8">Your one-stop solution for all your repair needs.</p>
          <Link to="/app" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-400 mb-4">
          Get Started
          </Link>
        </div>  
        <div id='imageCarousel' className='relative mt-4 border-4 rounded-lg border-gray-800 bg-blue-50' data-te-carousel-init data-te-ride="carousel">
            <div className='relative w-full overflow-hidden after:clear-both after:block after:content-[""]'>
                <div className='relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none' data-te-carousel-item data-te-carousel-active>
                  <img src={sowClub} alt="girls" className='block w-full' />
                </div>
                <div className='relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none'data-te-carousel-item data-te-carousel-active >
                  <img src={fictionSow} alt="cartoon" className='block w-full' />
                </div>
                <div className='relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none' data-te-carousel-item data-te-carousel-active>
                  <img src={manSowing} alt="man" className='block w-full' />
                </div>
            </div>
        </div>
      

      </div>
    </div>
  );
};

export default LandingPage;