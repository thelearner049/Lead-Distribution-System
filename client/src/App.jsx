import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RequestService from "./pages/RequestService";
import Dashboard from "./pages/Dashboard";
import TestTools from "./pages/TestTools";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav className="flex items-center justify-evenly shadow-sm bg-gray-900 border border-gray-700 m-3 px-3 py-2 rounded-md">
          <Link className="bg-yellow-500 px-4 py-2 rounded-4xl font-bold self-center text-black text-sm cursor-pointer" to="/">Request Service</Link>
          <Link className="bg-yellow-500 px-4 py-2 rounded-4xl font-bold self-center text-black text-sm cursor-pointer" to="/dashboard">Dashboard</Link>
          <Link className="bg-yellow-500 px-4 py-2 rounded-4xl font-bold self-center text-black text-sm cursor-pointer" to="/test-tools">Test Tools</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RequestService />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test-tools" element={<TestTools />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
