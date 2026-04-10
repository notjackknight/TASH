import { useContext } from 'react';
import { BookingContext, type BookingContextValue } from '../contexts/BookingContext';

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
}
