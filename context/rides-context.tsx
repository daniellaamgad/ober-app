import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Ride } from "../features/bookings/types";

type RidesContextType = {
  rides: Ride[];
  addRide: (ride: Ride) => void;
};

const RidesContext = createContext<RidesContextType | undefined>(
  undefined
);

export function RidesProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>([]);

  const addRide = (ride: Ride) => {
    setRides((currentRides) => [ride, ...currentRides]);
  };

  return (
    <RidesContext.Provider value={{ rides, addRide }}>
      {children}
    </RidesContext.Provider>
  );
}

export function useRides() {
  const context = useContext(RidesContext);

  if (!context) {
    throw new Error("useRides must be used inside RidesProvider");
  }

  return context;
}