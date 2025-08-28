import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Overlay from "./Overlay";
import displayPicture from "../assets/displaypicture.jpeg";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import ChatBox from "./ChatBox";
const Welcome = ({ personal, setIsCanvasLoaded }) => {
  const { github, linkedin, instagram } = personal?.social || {};
  const rootRef = useRef();
  const experienceDivRef = useRef();
  const canvasSectionRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [animation, setAnimation] = useState("Idle");
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  const handleAnimationChange = (newAnimation, shouldRefresh = false) => {
    const timeoutId = setTimeout(() => {
      setAnimation(newAnimation);
      if (shouldRefresh) {
        setRefreshAnimation((refreshAnimation) => !refreshAnimation);
      }
    }, 50);
    return timeoutId;
  };
  useEffect(() => {
    let timeoutId;
    if (scrollProgress <= 0) {
      timeoutId = handleAnimationChange("Dancing", true);
    } else if (scrollProgress >= 0.95) {
      timeoutId = handleAnimationChange("Waving", true);
    }
    return () => clearTimeout(timeoutId);
  }, [scrollProgress]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current || !experienceDivRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.current,
        start: isMobile ? `top -865.015625` : "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          setScrollDirection(self.direction);
        },
      },
    });
    if (isMobile) {
      tl.to(
        {},
        {
          duration: 1,
        },
        1
      );
    } else {
      tl.to(
        experienceDivRef.current,
        {
          x: "25%",
          duration: 1,
        },
        1
      );
    }
    return () => tl.kill();
  }, [isMobile]);

  return (
    <div
      className="scroll-wrapper"
      ref={rootRef}
      style={{
        overflowX: "clip",
        width: "100%",
        height: "600vh",
        position: "relative",
      }}
    >
      <section
        className="flex flex-col md:flex-row items-center justify-center bg-transparent px-4 md:px-8"
        style={{
          position: isMobile ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          minHeight: "50vh",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <img
          src={displayPicture}
          alt="Aaditya Prabu K"
          className="w-40 sm:w-48 md:w-64 h-auto object-cover rounded-2xl mb-4 md:mb-0 md:mr-8 shadow-lg"
        />
        <div className="flex flex-col items-center md:items-start w-full max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 md:text-left text-center text-[var(--primary)] drop-shadow-lg">
            Hi,
          </h2>
          <p className="mb-4 text-lg md:text-2xl italic font-light md:text-left text-center text-[var(--primary)]">
            "i'm an aspiring developer, artist, and innovator from Chennai. I'm
            passionate about blending creativity and technology to build
            meaningful experiences, whether through code, design, or art. Always
            curious, always experimenting — I love turning ideas into reality."
          </p>
          <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-6 mb-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="focus:outline-none"
              style={{ pointerEvents: "auto" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--primary)]"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.174 22 16.426 22 12.012 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="focus:outline-none"
              style={{ pointerEvents: "auto" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--primary)]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 8a6 6 0 0 1 6 6v6" />
                <line x1="8" y1="11" x2="8" y2="16" />
                <line x1="8" y1="8" x2="8" y2="8" />
              </svg>
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus:outline-none"
              style={{ pointerEvents: "auto" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--primary)]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
          </div>
          <p className="text-lg md:text-2xl font-semibold md:text-left text-center mt-4 animate-bounce text-[var(--primary)]">
            Scroll down to chat with my AI personal assistant!
          </p>
        </div>
      </section>

      {!isMobile && (
        <section
          style={{
            height: "100vh",
            width: "100%",
            top: 0,
            zIndex: 0,
            position: "sticky",
          }}
        >
          <div
            ref={experienceDivRef}
            style={{
              height: "100vh",
              width: "100%",
              transform: `translate(-30%,0)`,
            }}
          >
            <Canvas
              onCreated={() => {
                setIsCanvasLoaded(true);
                handleAnimationChange("Dancing", true);
              }}
            >
              <Experience
                refreshAnimation={refreshAnimation}
                scrollProgress={scrollProgress}
                scrollDirection={scrollDirection}
                animation={animation}
                handleAnimationChange={handleAnimationChange}
              />
            </Canvas>
          </div>
        </section>
      )}

      {/* Mobile Canvas Section: appears after welcome section */}
      {isMobile && (
        <section
          ref={canvasSectionRef}
          style={{ position: "sticky", width: "100%", top: 0, zIndex: 0 }}
        >
          <div
            ref={experienceDivRef}
            style={{
              height: "100vh",
              width: "100%",
              position: "relative",
            }}
          >
            <Canvas
              onCreated={() => {
                setIsCanvasLoaded(true);
                handleAnimationChange("Dancing", true);
              }}
            >
              <Experience
                refreshAnimation={refreshAnimation}
                scrollProgress={scrollProgress}
                scrollDirection={scrollDirection}
                animation={animation}
                handleAnimationChange={handleAnimationChange}
              />
            </Canvas>
          </div>
        </section>
      )}
      <section>
        <Overlay isMobile={isMobile} />
      </section>
      <section
        style={{
          height: isMobile ? "auto" : "100vh",
          position: "relative",
          zIndex: 5,
          paddingBottom: isMobile ? "2rem" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "sticky",
            width: "100%",
          }}
        >
          <div className="chat-header text-2xl font-bold text-[var(--primary)] mb-4 text-center">
            Chat with Aaditya Prabu K's personal assistant
          </div>
          <ChatBox
            canLoadChat={true}
            handleAnimationChange={handleAnimationChange}
          />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
