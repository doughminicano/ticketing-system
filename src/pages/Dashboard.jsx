import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tickets");
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Unable to fetch tickets. Please try again later.");
      }
    };

    fetchTickets();
  }, []);

  // Count tickets by priority
  const highPriorityCount = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;
  const mediumPriorityCount = tickets.filter(
    (ticket) => ticket.priority === "Medium"
  ).length;
  const lowPriorityCount = tickets.filter(
    (ticket) => ticket.priority === "Low"
  ).length;

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center mb-5">Dashboard</h1>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="gap-4 p-4 col-span-1 items-center justify-center">
        {/* High Priority Tickets */}
        <div className="mb-10" role="alert">
          <div
            className={`${
              highPriorityCount > 0 ? "animate-pulse" : ""
            } bg-red-500 text-white font-bold rounded-t px-4 py-2`}
          >
            High | {highPriorityCount}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <marquee>
              <p>
                {highPriorityCount > 0
                  ? `There are ${highPriorityCount} High Priority Tickets in queue. Please respond ASAP!`
                  : "No High Priority Tickets at the moment. "}
              </p>
            </marquee>
          </div>
        </div>

        {/* Medium Priority Tickets */}
        <div className="mb-10" role="alert">
          <div className="bg-yellow-500 text-white font-bold rounded-t px-4 py-2">
            Medium | {mediumPriorityCount}
          </div>
          <div className="border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-slate-950">
            <p>
              {mediumPriorityCount > 0
                ? `There are ${mediumPriorityCount} Medium Priority Tickets. Please look into them soon.`
                : "No Medium Priority Tickets at the moment."}
            </p>
          </div>
        </div>

        {/* Low Priority Tickets */}
        <div className="mb-10" role="alert">
          <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
            Low | {lowPriorityCount}
          </div>
          <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-slate-950">
            <p>
              {lowPriorityCount > 0
                ? `There are ${lowPriorityCount} Low Priority Tickets. Prioritize above before responding here.`
                : "No Low Priority Tickets at the moment."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
