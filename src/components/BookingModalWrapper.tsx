import { AnimatePresence } from 'motion/react';
import { useBooking } from '../hooks/useBooking';
import { BookingModal } from './BookingModal';

export function BookingModalWrapper() {
  const { isOpen, preselectedServiceTitle, closeBooking } = useBooking();

  return (
    <AnimatePresence>
      {isOpen && (
        <BookingModal
          onClose={closeBooking}
          preselectedServiceTitle={preselectedServiceTitle}
        />
      )}
    </AnimatePresence>
  );
}
