import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  calculateBookingPrice,
  formatCurrency,
  filterRooms,
  easeOutCubicBezier,
} from './booking';

test('calculateNights computes days accurately', () => {
  assert.equal(calculateNights('2026-11-01', '2026-11-05'), 4);
  assert.equal(calculateNights('2026-11-05', '2026-11-06'), 1);
  // Same day or reverse defaults to 1 minimum night
  assert.equal(calculateNights('2026-11-05', '2026-11-05'), 1);
  assert.equal(calculateNights('2026-11-10', '2026-11-05'), 1);
  assert.equal(calculateNights('', ''), 1);
});

test('calculateBookingPrice calculates subtotal, service fee, tax and total', () => {
  const result = calculateBookingPrice(1000, 3, 2);
  assert.equal(result.nights, 3);
  assert.equal(result.baseTotal, 3000);
  assert.equal(result.serviceCharge, 300); // 10%
  assert.equal(result.tourismTax, 150); // 5%
  assert.equal(result.grandTotal, 3450);
});

test('calculateBookingPrice handles additional guests gracefully', () => {
  const result2Guests = calculateBookingPrice(1000, 2, 2);
  const result4Guests = calculateBookingPrice(1000, 2, 4);
  assert.equal(result2Guests.baseTotal, 2000);
  assert.equal(result4Guests.baseTotal, 2600); // 1.3x multiplier
  assert.ok(result4Guests.grandTotal > result2Guests.grandTotal);
});

test('formatCurrency formats USD correctly', () => {
  const formatted = formatCurrency(2500);
  assert.match(formatted, /\$2,500/);
});

test('filterRooms filters by category and capacity', () => {
  const mockRooms = [
    { id: '1', name: 'Ocean Villa', category: 'villas', maxGuests: 2, pricePerNight: 1200 },
    { id: '2', name: 'Cliff Pavilion', category: 'pavilions', maxGuests: 4, pricePerNight: 2100 },
    { id: '3', name: 'Royal Sanctuary', category: 'penthouses', maxGuests: 6, pricePerNight: 4500 },
  ];

  const all = filterRooms(mockRooms, { category: 'all' });
  assert.equal(all.length, 3);

  const villasOnly = filterRooms(mockRooms, { category: 'villas' });
  assert.equal(villasOnly.length, 1);
  assert.equal(villasOnly[0].name, 'Ocean Villa');

  const fits4Guests = filterRooms(mockRooms, { minGuests: 4 });
  assert.equal(fits4Guests.length, 2);
});

test('easeOutCubicBezier returns 0 at 0 and 1 at 1', () => {
  assert.equal(easeOutCubicBezier(0), 0);
  assert.equal(easeOutCubicBezier(1), 1);
  const midpoint = easeOutCubicBezier(0.5);
  assert.ok(midpoint > 0.5, 'Cubic bezier ease-out should accelerate first then softly land');
});
