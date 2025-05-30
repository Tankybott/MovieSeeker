import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Join from "./pages/Join/Join";
import Contact from "./pages/Contact/Contact";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import Explore from "./pages/Explore/Explore";
import MovieDetails from "./pages/Movies/MovieDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movies/:slug" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

{
  /*https://www.themoviedb.org/ */
}
