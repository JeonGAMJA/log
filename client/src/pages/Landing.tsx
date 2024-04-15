import React, { useEffect } from 'react';
import MainText from '../components/Landing/MainText';
import IntroductionSection from '../components/Landing/IntroductionSection';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Landing = () => {
  useEffect(() => {
    axios
      .post('post', {})
      .then((data) => console.log(data))
      .catch((err) => console.log('111', err));
  }, []);

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
        <Link to="/signup">
          <button>시작하기</button>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
