// src/hoc/withFadeIn.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

const withAnimation = (WrappedComponent) => {
  return (props) => {
    const fadeIn = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 }
    });

    return (
      <animated.div style={{ width: "100%", height: "100%", ...fadeIn }}>
        <WrappedComponent {...props} />
      </animated.div>
    );
  };
};

export default withAnimation;
