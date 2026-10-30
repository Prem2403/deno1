/**
 * Pure helper functions for booking calculations, date validation, and room filtering.
 */

export interface PricingDetails {
  nights: number;
  baseTotal: number;
  serviceCharge: number;
  tourismTax: number;
  grandTotal: number;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function calculateBookingPrice(
  pricePerNight: number,
  nights: number,
  guests: number
): PricingDetails {
  const safeNights = Math.max(1, nights);
  const guestMultiplier = guests > 2 ? 1 + (guests - 2) * 0.15 : 1;
  const baseTotal = Math.round(pricePerNight * safeNights * guestMultiplier);
  const serviceCharge = Math.round(baseTotal * 0.10); // 10% luxury service fee
  const tourismTax = Math.round(baseTotal * 0.05); // 5% coastal sanctuary tax
  const grandTotal = baseTotal + serviceCharge + tourismTax;

  return {
    nights: safeNights,
    baseTotal,
    serviceCharge,
    tourismTax,
    grandTotal,
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface RoomFilterOptions {
  category?: string;
  minGuests?: number;
  maxPrice?: number;
}

export interface RoomItem {
  id: string;
  name: string;
  category: string;
  maxGuests: number;
  pricePerNight: number;
}

export function filterRooms<T extends RoomItem>(
  rooms: T[],
  options: RoomFilterOptions
): T[] {
  return rooms.filter((room) => {
    if (options.category && options.category !== 'all' && room.category !== options.category) {
      return false;
    }
    if (options.minGuests && room.maxGuests < options.minGuests) {
      return false;
    }
    if (options.maxPrice && room.pricePerNight > options.maxPrice) {
      return false;
    }
    return true;
  });
}

/**
 * Custom calm easing interpolation for counter animation:
 * Easing curve cubic-bezier(0.2, 0.8, 0.2, 1) approximation
 */
export function easeOutCubicBezier(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  // Fast approximate calculation for cubic-bezier(0.2, 0.8, 0.2, 1)
  // At t=0 -> 0, t=1 -> 1, fast smooth progression that decelerates calmly
  return 1 - Math.pow(1 - clamped, 3.5);
}
