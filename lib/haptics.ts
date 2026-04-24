/**
 * Luxury Haptics Utility
 * Provides subtle tactile feedback for mobile devices.
 */

type HapticStyle = "light" | "medium" | "heavy" | "success" | "error";

export const triggerHaptic = (style: HapticStyle = "light") => {
  if (typeof window === "undefined" || !window.navigator.vibrate) return;

  switch (style) {
    case "light":
      window.navigator.vibrate(10);
      break;
    case "medium":
      window.navigator.vibrate(20);
      break;
    case "heavy":
      window.navigator.vibrate(40);
      break;
    case "success":
      window.navigator.vibrate([10, 30, 10]);
      break;
    case "error":
      window.navigator.vibrate([50, 50, 50]);
      break;
    default:
      window.navigator.vibrate(10);
  }
};
