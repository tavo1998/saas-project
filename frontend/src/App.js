import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Table from "./pages/table/Table";

function App() {
  return (
    <div className="background">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/table" element={<Table />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
