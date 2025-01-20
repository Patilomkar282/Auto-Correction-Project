// import React from 'react';
import '../assets/slide.css'; // Import CSS file for styles

// eslint-disable-next-line react/prop-types
export default function SlideUpPage({ isSlidingUp }) {
  
  return (
    <div className={`full-page-cover ${isSlidingUp ? 'slide-up' : ''}`} style={{backgroundColor: '#fff7f5'}}>
      <img src="../../public/athenalogo.png" style={{width: '50%'}}/>
    </div>
  );
}
