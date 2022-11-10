import "./App.css";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shortId" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
