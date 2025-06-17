import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Join from "./pages/Join/Join";
import Contact from "./pages/Contact/Contact";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import Explore from "./pages/Explore/Explore";
import MovieDetails from "./pages/Movies/MovieDetails";
import ManageContentPage from "./pages/ManageContent/ManageContent";
import UpsertMovie from "./pages/UpsertMovie/UpsertMovie";

const App = () => {
  return (
    <BrowserRouter basename="/MovieSeeker/">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/manage-content/" element={<ManageContentPage />} />
          <Route path="/upsert-movie/:id" element={<UpsertMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
