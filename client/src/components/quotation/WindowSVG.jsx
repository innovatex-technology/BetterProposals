import React from "react";

const WindowSVG = () => {
  const windows = [
    { name: "Fixed Window", svg: FixedWindow },
    { name: "Frameless Glass Window", svg: FramelessGlassWindow },
    { name: "Tilt-and-Turn Window", svg: TiltAndTurnWindow },
    { name: "Casement Window", svg: CasementWindow },
    { name: "Sliding Window", svg: SlidingWindow },
    { name: "Up Sliding Window", svg: UpSlidingWindow },
    { name: "Down Sliding Window", svg: DownSlidingWindow },
    { name: "Horizontal Pivot Window", svg: HorizontalPivotWindow },
    { name: "Vertical Pivot Window", svg: VerticalPivotWindow },
    { name: "Folding Window", svg: FoldingWindow },
    { name: "Tilt Window", svg: TiltWindow },
    { name: "Awning Window", svg: AwningWindow },
    { name: "Folding/Sliding Window", svg: FoldingSlidingWindow },
    { name: "Skylight", svg: Skylight },
    { name: "Box-Type Window", svg: BoxTypeWindow },
    { name: "Security Window", svg: SecurityWindow },
    { name: "Sound Reducing Window", svg: SoundReducingWindow },
    { name: "Fireproof Window", svg: FireproofWindow },
    { name: "Sliding Window Two Track", svg: SlidingWindowTwoTrack },
    { name: "Sliding Window Three Track", svg: SlidingWindowThreeTrack },
    
  ];

  const windowStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    textAlign: "center",
    padding: "20px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Window Types Showcase</h1>
      <div style={windowStyles}>
        {windows.map(({ name, svg: SvgComponent }, index) => (
          <div key={index}>
            <h3>{name}</h3>
            <SvgComponent />
          </div>
        ))}
      </div>
    </div>
  );
};

// Fixed Window
const FixedWindow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" style={{ width: "100px", height: "150px" }}>
    <rect x="0" y="0" width="200" height="300" fill="none" stroke="gray" strokeWidth="10" />
    <rect x="10" y="10" width="180" height="280" fill="lightblue" stroke="black" strokeWidth="2" />
  </svg>
);

// Frameless Glass Window
const FramelessGlassWindow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" style={{ width: "100px", height: "150px" }}>
    <rect x="0" y="0" width="200" height="300" fill="lightblue" stroke="none" />
  </svg>
);

// Tilt-and-Turn Window
const TiltAndTurnWindow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" style={{ width: "100px", height: "150px" }}>
    <rect x="0" y="0" width="200" height="300" fill="none" stroke="gray" strokeWidth="10" />
    <line x1="0" y1="150" x2="200" y2="150" stroke="gray" strokeWidth="10" />
    <line x1="100" y1="0" x2="100" y2="300" stroke="black" strokeWidth="2" />
  </svg>
);

const SlidingWindowTwoTrack = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" style={{ width: "100px", height: "150px" }}>
      <rect x="0" y="0" width="200" height="300" fill="none" stroke="gray" strokeWidth="10" />
      <line x1="67" y1="0" x2="67" y2="300" stroke="black" strokeWidth="2" />
      <line x1="133" y1="0" x2="133" y2="300" stroke="black" strokeWidth="2" />
      <rect x="10" y="10" width="57" height="280" fill="lightblue" />
      <rect x="133" y="10" width="57" height="280" fill="lightblue" />
    </svg>
  );

  const SlidingWindowThreeTrack = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" style={{ width: "100px", height: "150px" }}>
      <rect x="0" y="0" width="200" height="300" fill="none" stroke="gray" strokeWidth="10" />
      <line x1="50" y1="0" x2="50" y2="300" stroke="black" strokeWidth="2" />
      <line x1="100" y1="0" x2="100" y2="300" stroke="black" strokeWidth="2" />
      <line x1="150" y1="0" x2="150" y2="300" stroke="black" strokeWidth="2" />
      <rect x="10" y="10" width="40" height="280" fill="lightblue" />
      <rect x="60" y="10" width="40" height="280" fill="lightblue" />
      <rect x="110" y="10" width="40" height="280" fill="lightblue" />
    </svg>
  );



// Add SVG components for other window types...
const CasementWindow = FixedWindow;
const SlidingWindow = FramelessGlassWindow;
const UpSlidingWindow = TiltAndTurnWindow;
const DownSlidingWindow = TiltAndTurnWindow;
const HorizontalPivotWindow = FixedWindow;
const VerticalPivotWindow = FramelessGlassWindow;
const FoldingWindow = TiltAndTurnWindow;
const TiltWindow = FixedWindow;
const AwningWindow = FramelessGlassWindow;
const FoldingSlidingWindow = TiltAndTurnWindow;
const Skylight = FixedWindow;
const BoxTypeWindow = FramelessGlassWindow;
const SecurityWindow = TiltAndTurnWindow;
const SoundReducingWindow = FixedWindow;
const FireproofWindow = FramelessGlassWindow;
// const SlidingWindowTwoTrack = SlidingWindowTwoTrack;

export default WindowSVG;
