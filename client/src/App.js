import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";
import EntryPage from "./pages/EntryPage";
import ViewAll from "./pages/ViewAll";
import RecipeDetails from "./pages/RecipeDetails";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="search" element={<Search />} />
          <Route path="entry" element={<EntryPage />} />
          <Route path="viewall" element={<ViewAll />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;