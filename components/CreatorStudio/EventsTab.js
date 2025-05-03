import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";

export default function EventsTab({ creator }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticketPrice: 50,
    capacity: 20,
    hotelId: "",
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events", {
        headers: { "x-phyllo-user-id": creator.userId },
      });
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, [creator]);

  const handleCreateEvent = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-phyllo-user-id": creator.userId,
        },
        body: JSON.stringify(newEvent),
      });
      const { eventId } = await response.json();
      await fetch(`/api/events/${eventId}/publish`, {
        method: "PUT",
        headers: { "x-phyllo-user-id": creator.userId },
      });
      setEvents([...events, { ...newEvent, _id: eventId, status: "live", 
ticketsSold: 0 }]);
      setNewEvent({ title: "", description: "", date: "", location: "", 
ticketPrice: 50, capacity: 20, hotelId: "" });
      setStep(1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Events</h2>

      {/* Create Event Form */}
      <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create a New Event</h3>
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-gray-300 mb-2">Date & 
Location</label>
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: 
e.target.value })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white 
mb-4"
            />
            <input
              type="text"
              placeholder="Location (e.g., Nazaré Beach)"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: 
e.target.value })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white"
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-gray-300 mb-2">Event 
Details</label>
            <input
              type="text"
              placeholder="Event Title (e.g., Sunset Supper Club)"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: 
e.target.value })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white 
mb-4"
            />
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: 
e.target.value })}
              className="w-full p-3 bg-gray-700 rounded-lg text-white"
            />
            <div className="flex gap-4 mt-4">
              <div>
                <label className="block text-gray-300 mb-2">Ticket Price 
($)</label>
                <input
                  type="number"
                  value={newEvent.ticketPrice}
                  onChange={(e) => setNewEvent({ ...newEvent, ticketPrice: 
Number(e.target.value) })}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 
mb-2">Capacity</label>
                <input
                  type="number"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({ ...newEvent, capacity: 
Number(e.target.value) })}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-300 mb-4">Review your event and 
publish!</p>
            <p className="text-gray-400">Title: {newEvent.title}</p>
            <p className="text-gray-400">Date: {new 
Date(newEvent.date).toLocaleString()}</p>
            <p className="text-gray-400">Location: {newEvent.location}</p>
            <p className="text-gray-400">Ticket Price: 
${newEvent.ticketPrice}</p>
            <p className="text-gray-400">Capacity: {newEvent.capacity}</p>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white 
rounded-full px-6 py-3 font-semibold"
          onClick={handleCreateEvent}
        >
          {step === 3 ? "Publish Event" : "Next Step"}
        </motion.button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold">{event.title}</h3>
            </div>
            <p className="text-gray-400 mb-2">Date: {new 
Date(event.date).toLocaleString()}</p>
            <p className="text-gray-400 mb-2">Tickets Sold: 
{event.ticketsSold}/{event.capacity}</p>
            <p className="text-gray-400">Earnings: ${(event.ticketsSold * 
event.ticketPrice * 0.95).toFixed(2)}</p>
          </motion.div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-400">No events yet. Create one 
above!</p>
        )}
      </div>
    </div>
  );
}
