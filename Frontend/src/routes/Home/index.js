import "./index.css";
import { useSelector } from "react-redux";
import MainPage from "./MainPage";
import AddsPage from "./AddsPage"


const Home = () => {
  const { user } = useSelector((s) => s.userReducer);

  return (
    <div className="home-page">{user ? <AddsPage /> : <MainPage />}</div>
  );
};

export default Home;