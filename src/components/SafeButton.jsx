import { useState, useRef } from "react";
import { useSizeContext } from "../context/SizeContext";

export default function SafeButton({

  children,
  onClick,
  style = {},
}) {

  const {
    preventRapidTaps,
    longPressMode,
    doubleTapMode,
    touchDelay,
  } = useSizeContext();

  const [disabled, setDisabled] = useState(false);
  const clickLock = useRef(false);
  const [tapCount, setTapCount] = useState(0);

  let pressTimer;

  // =========================
  // MAIN INTERACTION LOGIC
  // =========================

  const handleClick = () => {

    // Prevent rapid taps
   if (preventRapidTaps && clickLock.current) {
  return;
}

    // Double press mode
    if (doubleTapMode) {

      setTapCount(prev => prev + 1);

      setTimeout(() => {
        setTapCount(0);
      }, 500);

      if (tapCount !== 1) {
        return;
      }
    }

    // =========================
// EXECUTE ACTION
// =========================

const executeAction = () => {

  

  // Debounce protection
 if (preventRapidTaps) {

  clickLock.current = true;

  setDisabled(true);

  setTimeout(() => {

    clickLock.current = false;

    setDisabled(false);

  }, 1000);
}
  onClick();
};

// =========================
// TOUCH DELAY PROTECTION
// =========================

if (touchDelay) {

  setTimeout(() => {
    executeAction();
  }, 300);

} else {

  executeAction();
}

  };

  // =========================
  // LONG PRESS
  // =========================

  const handleMouseDown = () => {

    if (!longPressMode) return;

    pressTimer = setTimeout(() => {
      onClick();
    }, 1000);
  };

  const handleMouseUp = () => {

    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  };

  return (

    <button
      onClick={!longPressMode ? handleClick : undefined}

      onMouseDown={handleMouseDown}

      onMouseUp={handleMouseUp}

      style={{
        border: "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}