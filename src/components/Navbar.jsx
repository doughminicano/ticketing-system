import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="lg:w-64 md:w-32 sm:w-14 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Ticket System
        </div>
        <ul className="flex-1 p-4 space-y-4">
          <li>
            <a
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/tickets"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Tickets
            </a>
          </li>
          <li>
            <a
              href="/issue"
              className="block py-2 px-4 rounded hover:animate-pulse hover:text-white mt-20 bg-neutral-50"
            >
              <p className="text-slate-950 p-2 text-center">Submit Ticket</p>
            </a>
          </li>
        </ul>
        <div className="p-4 border-t border-gray-700">
          {" "}
          <a href="/">Log out</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet /> {/* React Router's Outlet to render child routes */}
      </main>
    </div>
  );
}
