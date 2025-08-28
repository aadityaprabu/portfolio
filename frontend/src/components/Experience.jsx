import { PerspectiveCamera } from "@react-three/drei";
import Avatar from "./Avatar";
import { useRef } from "react";
const Experience = (props) => {
  const {
    refreshAnimation,
    parentRef,
    scrollProgress,
    scrollDirection,
    animation,
    handleAnimationChange,
  } = props;
  const camRef = useRef();
  return (
    <>
      <PerspectiveCamera ref={camRef} makeDefault position={[0, 0, 0]} />
      <Avatar
        parentRef={parentRef}
        camRef={camRef}
        scrollProgress={scrollProgress}
        scrollDirection={scrollDirection}
        animation={animation}
        refreshAnimation={refreshAnimation}
        handleAnimationChange={handleAnimationChange}
      />
      <directionalLight intensity={3} position={[0, 2, 5]} />
    </>
  );
};

export default Experience;
