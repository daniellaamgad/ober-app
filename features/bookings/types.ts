export type Ride = {
  id: string;
  pickup: string;
  destination: string;
  carType: string;
  price: number;
  date: string;
  scheduledAt: string;
  status: "Scheduled" | "Confirmed";
};
