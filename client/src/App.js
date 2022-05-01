import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";
import Entry from "./pages/RecipeEntry/EntryPage";
import ViewAll from "./pages/ViewAll";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="search" element={<Search />} />
          <Route path="entry" element={<Entry />} />
          <Route path="viewall" element={<ViewAll />} />

        </Routes>
      </Container>
    </>
  );
};

export default App;