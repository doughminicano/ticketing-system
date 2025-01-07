import { useState, useEffect } from "react";
import axios from "axios";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null); // For modal

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tickets");
      if (response.data.length > 0) {
        setTickets(response.data);
        setError("");
      } else {
        setError("No tickets at this time");
      }
    } catch (err) {
      console.error("Error connecting to the server:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  // Update ticket status
  const updateTicketStatus = async (id, status) => {
    try {
      const ticketToUpdate = tickets.find((ticket) => ticket.id === id);
      const updatedTicket = { ...ticketToUpdate, status };

      const response = await axios.put(
        `http://localhost:3001/tickets/${id}`,
        updatedTicket
      );

      if (response.status === 200) {
        setTickets(
          tickets.map((ticket) => (ticket.id === id ? updatedTicket : ticket))
        );
        alert("Ticket status updated!");
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
      setError("Failed to update ticket. Please try again.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="relative">
      {/* Blur background if modal is open */}
      <div className={selectedTicket ? "blur-sm" : ""}>
        <div className="max-w-3xl mx-auto mt-6">
          {error && <p className="text-red-500">{error}</p>}
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`bg-gray-800 bg-opacity-10 shadow-lg rounded-lg p-6 mb-4 ${
                ticket.status === "Completed" ? "border-green-500 border-2" : ""
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
              <p className="text-sm text-gray-600">Date: {ticket.date}</p>
              <p className="text-sm text-gray-600">Time: {ticket.time}</p>
              <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-bold ${
                    ticket.status === "Completed" ? "text-green-500" : ""
                  }`}
                >
                  {ticket.status || "Unopened"}
                </span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the modal
                  updateTicketStatus(ticket.id, "Completed");
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedTicket.title}</h2>
            <p>Date: {selectedTicket.date}</p>
            <p>Time: {selectedTicket.time}</p>
            <p>Priority: {selectedTicket.priority}</p>
            <p>Status: {selectedTicket.status}</p>
            <p className="mt-2">{selectedTicket.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
