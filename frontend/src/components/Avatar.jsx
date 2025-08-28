import { useAnimations, useFBX, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const Avatar = (props) => {
  const {
    camRef,
    scrollProgress,
    scrollDirection,
    handleAnimationChange,
    animation,
    refreshAnimation,
  } = props;
  const ref = useRef();
  const timeline = useRef(null);
  const isHoverOverAvatarEnabledRef = useRef(false);
  const currentAnimation = useRef(null);
  const avatarHeadRef = useRef();
  const [
    /* state variables if any */
  ] = useState();
  const { scene } = useGLTF("./models/avatar.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const headVec = nodes["Head"].getWorldPosition(new THREE.Vector3());
  const waistVec = nodes["Hips"].getWorldPosition(new THREE.Vector3());
  const leftFootVec = nodes["LeftFoot"].getWorldPosition(new THREE.Vector3());
  const rightFootVec = nodes["RightFoot"].getWorldPosition(new THREE.Vector3());
  const feetVec = leftFootVec.clone().add(rightFootVec).multiplyScalar(0.5);
  const bodyVec = waistVec
    .clone()
    .add(headVec.clone().sub(waistVec).multiplyScalar(0.5));
  const { animations: jollyJumping } = useFBX("animations/JollyJumping.fbx");
  const { animations: waving } = useFBX("animations/Waving.fbx");
  const { animations: idle } = useFBX("animations/Idle.fbx");
  const { animations: angry } = useFBX("animations/Angry.fbx");
  const { animations: talking } = useFBX("animations/Talking.fbx");
  const { animations: dancing } = useFBX("animations/Dancing.fbx");
  jollyJumping[0].name = "JollyJumping";
  waving[0].name = "Waving";
  idle[0].name = "Idle";
  angry[0].name = "Angry";
  talking[0].name = "Talking";
  dancing[0].name = "Dancing";

  const animations = [
    idle[0],
    jollyJumping[0],
    waving[0],
    angry[0],
    talking[0],
    dancing[0],
  ];

  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    isHoverOverAvatarEnabledRef.current = true;
    if (scrollProgress >= 0.02) {
      isHoverOverAvatarEnabledRef.current = false;
    }
  }, [scrollProgress]);
  useEffect(() => {
    console.log("Current playing", animation);
    actions[animation]?.reset().fadeIn(1).play();
    return () => {
      console.log("Fading out", animation);
      actions[animation]?.reset().fadeOut(1);
    };
  }, [animation, refreshAnimation]);

  useEffect(() => {
    ref.current.position.set(0, 0, 0);
    camRef.current.position.set(0, 1.5, 5);
    camRef.current.lookAt(feetVec);
    avatarHeadRef.current = nodes["Head"];
  }, []);

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });

    timeline.current.to(
      camRef.current.position,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        onUpdate: () => {
          camRef.current.lookAt(feetVec);
        },
      },
      0
    );
    timeline.current.to(
      ref.current.rotation,
      {
        y: Math.PI / 2,
        duration: 1,
      },
      0
    );

    timeline.current.to(
      ref.current.rotation,
      {
        y: Math.PI * 2,
        duration: 1,
      },
      1
    );

    timeline.current.to(
      camRef.current.position,
      {
        y: headVec.y,
        duration: 1,
      },
      1
    );
    timeline.current.to(
      { t: 0 },
      {
        t: 1,
        duration: 1,
        ease: "none",
        onStart: () => {
          timeline.current.startCamQuat = camRef.current.quaternion.clone();
          timeline.current.tempCam = camRef.current.clone();
          timeline.current.tempCam.lookAt(headVec);
          timeline.current.endCamQuat = timeline.current.tempCam.quaternion;
        },
        onUpdate: () => {
          if (timeline.current.direction > 0) {
            camRef.current.quaternion.slerp(timeline.current.endCamQuat, 0.05);
          } else {
            camRef.current.quaternion.slerp(
              timeline.current.startCamQuat,
              0.05
            );
          }
        },
      },
      2
    );

    timeline.current.to(
      { t: 0 },
      {
        t: 1,
        duration: 1,
        onUpdate: () => {
          if (timeline.current.direction > 0) {
            const headQuat = [
              -0.15622173633332695, 0.3371195511194514, -0.056833321398259945,
              0.9266688464218824,
            ];
            const endQuat = new THREE.Quaternion().fromArray(headQuat);
            avatarHeadRef.current.quaternion.slerp(endQuat, 0.05);
          } else {
            const headQuat = [
              -0.1629688430051355, 0.06377596026404803, -0.0107520321974357,
              0.9845091450936753,
            ];

            const endQuat = new THREE.Quaternion().fromArray(headQuat);
            avatarHeadRef.current.quaternion.slerp(endQuat, 0.05);
          }
        },
      },
      3
    );
    timeline.current.to(
      camRef.current.position,
      {
        x: 0,
        y: headVec.y,
        z: 0.5,
        duration: 1,
        onUpdate: () => {
          avatarHeadRef.current.lookAt(camRef.current.position);
          camRef.current.lookAt(headVec);
        },
      },
      4
    );
    timeline.current.to(
      camRef.current.position,
      {
        x: 0,
        y: headVec.y,
        z: 4,
        duration: 1,
        onUpdate: () => {
          avatarHeadRef.current.lookAt(camRef.current.position);
          camRef.current.lookAt(headVec);
        },
      },
      5
    );
    return () => timeline.current.kill();
  }, []);

  useLayoutEffect(() => {
    if (timeline.current) {
      timeline.current.progress(scrollProgress);
      timeline.current.direction = scrollDirection;
    }
  }, [scrollProgress, scrollDirection]);

  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={() => {
        if (!isHoverOverAvatarEnabledRef.current) return;
        handleAnimationChange("JollyJumping", false);
      }}
      onPointerOut={() => {
        if (!isHoverOverAvatarEnabledRef.current) return;
        handleAnimationChange("Idle", false);
      }}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
};

export default Avatar;
useGLTF.preload("./models/avatar.glb");
