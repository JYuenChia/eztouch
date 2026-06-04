import { useState, useRef } from "react";
import { useSizeContext } from "../context/SizeContext";

export default function SafeButton({
  children,
  onClick,
  style = {},
  confirmationFor = null,
}) {

  const {
    preventRapidTaps,
    longPressMode,
    doubleTapMode,
    touchDelay,
    confirmationMode,
    confirmSendMessage,
    confirmCalls,
    confirmationType,
    confirmLikes,
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
// CONFIRMATION MODE
// =========================

if (confirmationMode) {

  // MESSAGE CONFIRMATION
  if (
    confirmationFor === "message" &&
    confirmSendMessage
  ) {

    // POPUP CONFIRMATION
    if (
      confirmationType ===
      "Popup Confirmation"
    ) {

      const confirmed =
        window.confirm(
          "Send this message?"
        );

      if (!confirmed) {
        return;
      }
    }

    // DOUBLE TAP CONFIRM
    if (
      confirmationType ===
      "Double-tap-confirm"
    ) {

      setTapCount(prev => prev + 1);

      setTimeout(() => {
        setTapCount(0);
      }, 500);

      if (tapCount !== 1) {
        return;
      }
    }
  }

  // CALL CONFIRMATION
  if (
    confirmationFor === "call" &&
    confirmCalls
  ) {

    if (
      confirmationType ===
      "Popup Confirmation"
    ) {

      const confirmed =
        window.confirm(
          "Start this call?"
        );

      if (!confirmed) {
        return;
      }
    }
  }
  // LIKE / COMMENT CONFIRMATION
if (
  confirmationFor === "like" &&
  confirmLikes
) {

  // POPUP CONFIRMATION
  if (
    confirmationType ===
    "Popup Confirmation"
  ) {

    const confirmed =
      window.confirm(
        "Like or comment on this post?"
      );

    if (!confirmed) {
      return;
    }
  }

  // DOUBLE TAP CONFIRM
  if (
    confirmationType ===
    "Double-tap-confirm"
  ) {

    setTapCount(prev => prev + 1);

    setTimeout(() => {
      setTapCount(0);
    }, 500);

    if (tapCount !== 1) {
      return;
    }
  }
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