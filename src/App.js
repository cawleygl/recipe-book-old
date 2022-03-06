import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import LandingPage from "./routes/LandingPage";
import Search from "./routes/Search";
import Entry from "./routes/Entry";
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
        </Routes>
      </Container>

    </>
  );
};

export default App;