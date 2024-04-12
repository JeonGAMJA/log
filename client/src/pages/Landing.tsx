import React from 'react';
import MainText from '../components/Landing/MainText';
import IntroductionSection from '../components/Landing/IntroductionSection';

const Landing = () => {
  return (
    <div>
      <section>
        <MainText />
      </section>
      <section>
        <IntroductionSection />
      </section>
      <section>
        <IntroductionSection />
      </section>
      <section>
        <IntroductionSection />
      </section>
      <section>
        <IntroductionSection />
        <button></button>
      </section>
    </div>
  );
};

export default Landing;
