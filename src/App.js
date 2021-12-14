import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import "./App.css"
import AppBar from "./components/AppBar"
import Footer from "./components/Footer";
import ComicsDetailsPage from "./pages/ComicDetailsPage";
import ComicsPage from "./pages/ComicsPage";
import HomePage from "./pages/HomePage";
import SuperHeroeDetailsPage from "./pages/SuperHeroeDetailsPage";
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
          <Route path="/superheroes/:id" element={<SuperHeroeDetailsPage />} />
          <Route path="/comics/:id" element={<ComicsDetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>     
    </div>
  );
}

export default App;
