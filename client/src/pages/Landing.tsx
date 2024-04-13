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
        <button>시작하기</button>
        //버튼 누르면 FadeOut 되면서 로그인페이지로 전환
      </section>
    </div>
  );
};

export default Landing;
