import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null); // For modal
  const ticketL = tickets.length;

  // Fetch tickets from the server
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

  // Delete ticket by ID
  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tickets/${id}`);
      setTickets(tickets.filter((ticket) => ticket.id !== id)); // Remove ticket from state
      alert("Ticket deleted successfully!");
    } catch (err) {
      console.error("Error deleting ticket:", err);
      setError("Failed to delete the ticket. Please try again.");
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

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
    console.log(ticketL)
  }, [ticketL]);

  return (
    <div className="relative">
      {/* Blur background if modal is open */}
      <div className={selectedTicket ? "blur-sm" : ""}>
        <div className="max-w-3xl mx-auto mt-6 flex flex-col-reverse">
          {error && <p className="text-red-500">{error}</p>}
          {tickets.map((ticket) => (
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              key={ticket.id}
              className={`bg-gray-800 bg-opacity-10 shadow-lg rounded-lg p-6 mb-4 ${
                ticket.status === "Completed" ? "border-green-500 border-2" : ""
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
                <div className="text-xl font-bold">Ticket: #{ticket.id}</div>
              </div>
              <p className="text-sm font-semibold text-gray-600">
                Date: {ticket.date}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Time: {ticket.time}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Priority: {ticket.priority}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Employee Id: {ticket.sender?.employeeId || "N/A"}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Name: {ticket.sender?.name || "N/A"}
              </p>
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
              {/* Actions: Delete and Update */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => deleteTicket(ticket.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    updateTicketStatus(ticket.id, "Completed");
                  }}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Mark Completed
                </button>
              </div>
            </motion.div>
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
            <h2 className="text-xl mb-4">MESSAGE:</h2>
            <h3 className="mt-4 mb-4 font-extrabold">
              {selectedTicket.message}
            </h3>
            <p>Status: {selectedTicket.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
