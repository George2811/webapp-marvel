import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"
import AppBar from "./components/AppBar"
import ComicsPage from "./pages/ComicsPage";
import SuperHeroesPage from "./pages/SuperHeroesPage";

function App() {
  return (
    <div>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/superheroes" element={<SuperHeroesPage />} />
          <Route path="/comics" element={<ComicsPage />} />
        </Routes>
      </Router>     
    </div>
  );
}

export default App;
