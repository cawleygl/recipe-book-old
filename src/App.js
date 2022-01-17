import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";
import Entry from "./pages/Entry";

import Navigation from "./components/Navigation";


export default function App() {
  return (
    <Router>
      <Navigation />
        <Routes>
          <Route path='/search' element={<Search />} />
          <Route path='/entry' element={<Entry />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
    </Router>
  );
}

