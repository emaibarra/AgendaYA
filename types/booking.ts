export type Booking = {
  id: string;
  eventTypeId: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  name: string;
  email: string;
  phone?: string;
  note?: string;
  createdAt: string;
};

export type Reservation = {
  id: number;
  patient: string;
  email: string;
  phone?: string;
  note?: string;
  service?: string;
  date: string;
  time: string;
  confirmed: boolean;
};

export type Slot = {
  time: string;
  available: boolean;
};

export type Modality = 'presencial' | 'virtual' | 'ambas';

export type EventType = {
  id: string;
  name: string;
  duration: number; // minutos
  description: string;
  modality: Modality;
};
