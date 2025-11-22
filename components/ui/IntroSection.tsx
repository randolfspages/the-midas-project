import React from 'react';
import Image from 'next/image';
import { ibmPlexSerifLight, ibmPlexSerifRegular, ibmPlexSerifBold } from '@/lib/fonts'

const IntroSection: React.FC = () => {
  return (
    <section className="intro">
      <div className='flex flex-col items-center space-y-1'>
      <div>
        <Image src={'/midas-logo.png'} width={100} height={100} alt='logo'/>
      </div>
        <span className={ibmPlexSerifBold.className}>THE MIDAS PROJECT</span>
      </div>
    </section>
  );
};

export default IntroSection;