"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Bookings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Schedule Creator Booking</h3>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    </div>
  );
};

export default Bookings;

