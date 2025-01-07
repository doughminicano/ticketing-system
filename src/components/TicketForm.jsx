import { useState, useEffect } from "react";
import axios from "axios";

const TicketForm = () => {
  // State to manage form data
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Unopened")

  useEffect(() => {
    // Set the current date and time when the component mounts
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T"); // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!title || !message) {
      setError("Please fill out all fields.");
      return;
    }

    const sender = {
      employeeId,
      name,
      department,
    };

    const newTicket = {
      sender,
      title,
      message,
      priority,
      date,
      time,
      status
    };

    try {
      // Submit the new ticket to the server
      const response = await axios.post(
        "http://localhost:3001/tickets",
        newTicket
      );
      if (response.status === 201) {
        alert(`Successfull! Ticket Number ${employeeId}`);

        // Reset form
        setName("");
        setTitle("");
        setEmployeeId("");
        setDepartment("");
        setMessage("");
        setPriority("Low");
        setDate("");
        setTime("");
        setError("");
        setStatus();
      }
    } catch (err) {
      console.error("Error submitting ticket:", err);
      setError("An error occurred while submitting the ticket.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit a Ticket</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Ticket Title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee Id
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Employee Id"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Department"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Describe your issue"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
