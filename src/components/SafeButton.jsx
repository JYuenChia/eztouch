import { useState, useRef } from "react";
import { useSizeContext } from "../context/SizeContext";
import ConfirmationModal from "./ConfirmationModal";

export default function SafeButton({
  children,
  onClick,
  style = {},
  confirmationFor = null,
  "aria-label": ariaLabel,
}) {
  const {
    safeMode,
    preventRapidTaps,
    longPressMode,
    doubleTapMode,
    touchDelay,
    confirmationMode,
    confirmSendMessage,
    confirmCalls,
    confirmLikes,
    confirmationType,
  } = useSizeContext();

  const [disabled, setDisabled] = useState(false);
  const clickLock = useRef(false);
  const [tapCount, setTapCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const pressTimer = useRef(null);
  const tapResetTimer = useRef(null);

  // Computed Safe Interaction States
  const isSafeModeActive = safeMode === true;
  const isRapidTapProtected = isSafeModeActive && preventRapidTaps;
  const isDoubleTap = isSafeModeActive && doubleTapMode;
  const isLongPress = isSafeModeActive && longPressMode;
  const hasTouchDelay = isSafeModeActive && touchDelay;

  // Computed Confirmation States
  const requiresConfirmation = () => {
    if (!confirmationMode) return false;
    if (confirmationFor === "message" && confirmSendMessage) return true;
    if (confirmationFor === "call" && confirmCalls) return true;
    if (confirmationFor === "like" && confirmLikes) return true;
    return false;
  };

  // 1. Execute Final Action (after both Safe Interaction and Confirmation)
  const executeFinalAction = () => {
    if (onClick) onClick();
  };

  // 2. Trigger Action (after Safe Interaction gesture is successful)
  const triggerAction = () => {
    // Rapid tap protection
    if (isRapidTapProtected) {
      clickLock.current = true;
      setDisabled(true);
      setTimeout(() => {
        clickLock.current = false;
        setDisabled(false);
      }, 1000);
    }

    if (requiresConfirmation()) {
      setShowModal(true);
    } else {
      if (hasTouchDelay) {
        setTimeout(() => executeFinalAction(), 300);
      } else {
        executeFinalAction();
      }
    }
  };

  // 3. Gestures
  const handleDoubleTapCheck = () => {
    if (tapResetTimer.current) clearTimeout(tapResetTimer.current);

    setTapCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 2) {
        return 0; // Reset after successful double tap
      }
      return nextCount;
    });

    tapResetTimer.current = setTimeout(() => {
      setTapCount(0);
    }, 500);

    return tapCount === 1; // It was 1 before this tap, so now it's 2
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (isRapidTapProtected && clickLock.current) return;

    if (isLongPress) return; // Long press is handled by mouse down/up

    if (isDoubleTap) {
      if (handleDoubleTapCheck()) {
        triggerAction();
      }
    } else {
      triggerAction();
    }
  };

  const handleMouseDown = (e) => {
    if (!isLongPress) return;
    
    pressTimer.current = setTimeout(() => {
      triggerAction();
    }, 1500); // Wait for 1.5s hold
  };

  const handleMouseUp = (e) => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  return (
    <>
      <button
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        style={{
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
          ...style,
        }}
      >
        {children}
      </button>

      <ConfirmationModal
        open={showModal}
        title="Confirm Action"
        message="Are you sure you want to continue?"
        type={confirmationType}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          // Wait to execute just slightly to allow modal to close smoothly
          setTimeout(() => executeFinalAction(), 50);
        }}
      />
    </>
  );
}