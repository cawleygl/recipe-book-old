import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import LandingPage from "./routes/LandingPage";
import Search from "./routes/Search";
import Entry from "./routes/Entry";
import Recipes from "./routes/Recipes";

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
          <Route path="recipes" element={<Recipes />} />

        </Routes>
      </Container>
    </>
  );
};

export default App;