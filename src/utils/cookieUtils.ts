/**
 * Cookie Utilities for client-side persistence and coupon redemption differentiation.
 * Acts as a temporary client-side differentiator before full DB authentication & checks.
 */

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

/**
 * Returns list of coupon codes already redeemed on this browser.
 * Checks both cookies (primary) and localStorage (secondary fallback).
 */
export function getRedeemedCoupons(): string[] {
  if (typeof document === "undefined") return [];

  // 1. Check primary cookie
  try {
    const cookieVal = getCookie("yb_redeemed_coupons");
    if (cookieVal) {
      const parsed = JSON.parse(cookieVal);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }

  // 2. Check localStorage fallback
  try {
    const localVal = localStorage.getItem("yourbrand_redeemed_coupons");
    if (localVal) {
      const parsed = JSON.parse(localVal);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }

  return [];
}

/**
 * Checks if a coupon code has already been used/redeemed on this browser.
 */
export function isCouponRedeemed(code: string): boolean {
  if (!code) return false;
  const list = getRedeemedCoupons();
  return list.includes(code.trim().toUpperCase());
}

/**
 * Marks a coupon code as permanently redeemed on this browser.
 * Stores in cookies with a 1-year expiration and unique differentiator token.
 */
export function markCouponAsRedeemed(code: string) {
  if (!code) return;
  const normalized = code.trim().toUpperCase();
  const current = getRedeemedCoupons();

  if (!current.includes(normalized)) {
    const updated = [...current, normalized];
    const differentiatorToken = `DIFF-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Set cookie differentiator with 365 days expiry
    setCookie("yb_redeemed_coupons", JSON.stringify(updated), 365);
    setCookie(`yb_diff_${normalized}`, differentiatorToken, 365);

    // Also sync localStorage for resilience against partial cookie clearing
    try {
      localStorage.setItem("yourbrand_redeemed_coupons", JSON.stringify(updated));
      localStorage.setItem(`yourbrand_diff_${normalized}`, differentiatorToken);
    } catch {
      // ignore
    }
  }
}

