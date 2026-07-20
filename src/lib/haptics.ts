// ─── Cross-Platform Haptics Utility ──────────────────────────────────────────
// Trigger soft, medium, or heavy haptic feedback on devices supporting navigator.vibrate

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success';

export function triggerHaptic(type: HapticType = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'heavy':
        navigator.vibrate(35);
        break;
      case 'selection':
        navigator.vibrate([6, 12]);
        break;
      case 'success':
        navigator.vibrate([12, 24, 18]);
        break;
    }
  } catch {
    // Suppressed if user disabled vibration or platform blocks non-user-gesture haptics
  }
}
