import React from "react";
const Overlay = ({ isMobile }) => {
  if (isMobile)
    return (
      <div>
        <section style={{ height: "400vh" }}></section>
      </div>
    );
  return (
    <div style={{ position: "relative", zIndex: -1 }}>
      <section style={{ height: "100vh", zIndex: 0 }}>
        <div className="flex flex-col justify-center items-center h-full py-24">
          <div
            className="rounded-3xl  px-10 py-12 flex flex-col items-center max-w-8xl mx-auto"
            style={{ minHeight: "auto" }}
          >
            <div
              className="w-full text-center text-4xl md:text-5xl font-bold italic leading-snug"
              style={{ color: "var(--text)" }}
            >
              If your dreams aren't going to
              <span
                className="block text-6xl md:text-7xl font-extrabold uppercase mb-2"
                style={{ color: "var(--text)" }}
              >
                SCARE
              </span>
              you then what kind of
              <br className="hidden md:block" />
              of{" "}
              <span
                className="text-6xl md:text-7xl font-extrabold italic uppercase"
                style={{ color: "var(--text)" }}
              >
                DREAM
              </span>{" "}
              are you having?
            </div>
          </div>
        </div>
      </section>
      <section style={{ height: "100vh", zIndex: 0 }}>
        <div className="grid grid-cols-2 h-full py-24 gap-8">
          {[...Array(2)].map((_, col) => (
            <div key={col} className="flex flex-col justify-between h-full">
              {[...Array(4)].map((_, row) => (
                <div key={row} className="flex justify-center">
                  <span className="text-[5vw] font-extrabold uppercase text-[var(--primary)]">
                    {(row + col) % 2 === 0 ? "DREAM" : "BIG"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section style={{ height: "100vh", zIndex: 0 }}>
        <div className="grid grid-cols-3 h-full py-24 gap-8">
          {[...Array(3)].map((_, col) => (
            <div key={col} className="flex flex-col justify-between h-full">
              {[...Array(5)].map((_, row) => (
                <div key={row} className="flex justify-center">
                  <span className="text-[5vw] font-extrabold uppercase text-[var(--primary)]">
                    {(row + col) % 2 === 0 ? "CREATE" : "DEVELOP"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section style={{ height: "100vh", zIndex: 0 }}>
        <div className="grid grid-cols-4 h-full py-24 gap-8">
          {[...Array(4)].map((_, col) => (
            <div key={col} className="flex flex-col justify-between h-full">
              {[...Array(5)].map((_, row) => (
                <div key={row} className="flex justify-center">
                  <span className="text-[4vw] font-extrabold uppercase text-[var(--primary)]">
                    {(row + col) % 2 === 0 ? "ART" : "INNOVATE"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Overlay;
