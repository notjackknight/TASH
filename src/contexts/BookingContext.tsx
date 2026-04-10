import { createContext, useState, useCallback, type ReactNode } from 'react';

export type BookingContextValue = {
  isOpen: boolean;
  preselectedServiceTitle: string | null;
  openBooking: (serviceTitle?: string) => void;
  closeBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedServiceTitle, setPreselectedServiceTitle] = useState<string | null>(null);

  const openBooking = useCallback((serviceTitle?: string) => {
    setPreselectedServiceTitle(serviceTitle || null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselectedServiceTitle(null);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, preselectedServiceTitle, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
