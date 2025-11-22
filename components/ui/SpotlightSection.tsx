'use client';

import React from 'react';
import type { Feature } from '../../lib/types';
import Link from 'next/link';

const features: Feature[] = [
  { name: 'ANTHROPIC', link: '#' },
  { name: 'OPEN AI', link: '#' },
  { name: 'META', link: '#'},
  { name: 'APPLE', link: '#'},
  { name: 'ALPHABET', link: '#'},
  { name: 'NVIDIA', link: '#'},
  { name: 'MICROSOFT', link: '#'},
  
];

const SpotlightSection: React.FC = () => {
  return (
    <section className="spotlight">
      <div className="spotlight-content">
        <div className="spotlight-bg">
          <img src="/mesh2.png" alt="bg-image" />
        </div>
        <span className='text-3xl md:text-6xl text-center'>Holding<br />The Hyperscalers</span>
      </div>

      <div className="header">
        <div className="header-content">
          <h1 className=''>With Our AI Super PACs Tracker (ASPACT)</h1>
          <p>
            Discover a Realtime Transparency into the AI Political Spending
          </p>
        </div>
      </div>

      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
             <p className='p-2 font-bold'>{feature.name}</p>
            </div>
          </div>
        ))}
      </div>

      
      <Link className='search-bar cursor-pointer text-2xl font-bold' href={'/dashboard'}>
        ACCOUNTABLE &#x2794; 
      </Link>
      
    </section>
  );
};

export default SpotlightSection;