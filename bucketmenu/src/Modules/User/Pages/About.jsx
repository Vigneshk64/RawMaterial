import React from 'react';
import '../css/About.css';
import Header from './Header';

export default function About() {
  console.log('About component rendered');
  return (
    <div className="about">
      <Header />
        <h1  style={{padding:'10px'}}>About</h1>

      <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Welcome to <strong>Bucket</strong>, where shopping meets innovation. We aim to provide
          a smooth and enjoyable shopping experience with a focus on quality, affordability, and
          customer satisfaction. Explore the latest trends and timeless classics all in one place!
        </p>

        </div>
    </div>
  );
}
