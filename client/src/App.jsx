import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequestService from "./pages/RequestService";
import Dashboard from "./pages/Dashboard";
import TestTools from "./pages/TestTools";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequestService />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-tools" element={<TestTools />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
