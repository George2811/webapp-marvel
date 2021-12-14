import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"
import AppBar from "./components/AppBar"
import Footer from "./components/Footer";
import ComicsPage from "./pages/ComicsPage";
import HomePage from "./pages/HomePage";
import SuperHeroesPage from "./pages/SuperHeroesPage";

function App() {
  return (
    <div>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/superheroes" element={<SuperHeroesPage />} />
          <Route path="/comics" element={<ComicsPage />} />
        </Routes>
        <Footer />
      </Router>     
    </div>
  );
}

export default App;
