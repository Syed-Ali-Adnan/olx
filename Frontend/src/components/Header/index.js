import mainLogo1 from './assets/mainLogo1.png';
import propertyLogo from './assets/propertyLogo.png';
import carLogo from './assets/carLogo.jpg';
import business from "./assets/business.png";
import furniture from "./assets/furniture.png";
import fashion from "./assets/fashion.png";
import electronics from "./assets/electronics.png";
import books from "./assets/books.png";
import animals from "./assets/animals.png";
import bikes from "./assets/bikes.png";
import banner from "./assets/banner.jpeg"
import banner2 from "./assets/banner2.jpeg"
import banner3 from "./assets/banner3.jpeg"
import search from './assets/search.jpg'
import profile from './assets/profile.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logOut } from "../../store/userSlice";


import "./index.css"
import { useState } from 'react';

const Header = () => {
  const { user } = useSelector((s) => s.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput,setSearchInput] = useState('')
  const [searchResult, searchResults] = useState([]);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };


  const handleSearch = () => {
    fetch(`/searchAdd?productName=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Search Results:", data); // Handle search results (e.g., save to state or display)
      })
      .catch((error) => {
        console.error('Error fetching ads:', error);
      });
  };
  return (
  
  <div>
        <section className="logo">
          <Link to="/"><img className="olx_logo" src={mainLogo1} /></Link>
          <div className="motorHeading">
            <img className="logoPic" src={carLogo} />
            <h3 className="Logo_Heading">Motors</h3>
          </div>
          <div className="propertyHeading">
            <img className="logoPic" src={propertyLogo} />
            <h3 className="Logo_Heading">Property</h3>
          </div>
          <div className="propertyHeading">
          <Link to="/profile"><img className="profilePic" src={profile} /></Link>
          <Link className='profilelink' to="/profile"> <h3 className="profile_Heading">Profile</h3></Link>
          </div>
        </section>




        <section className="search_input_bar">

          <select className="location">
            <option>Pakistan</option>
            <option>User your location</option>
          </select>

          <section>
          <input className="serach_bar" placeholder="Find Cars,Mobile Phones and more..." value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ></input>

          <button className="search_btn" onClick={handleSearch}> <img className="search_logo" src={search}></img> </button>
          </section>
          <section className='btn_box'>
          {user ? 
          <div>
      <button className="login_button" onClick={handleLogOut}>Log Out</button> 
      <Link to="./create-add"><button className='sell_btn'>+SELL</button></Link>
      <Link className="login_button" to="/my-add">My Adds</Link> 
      </div> : 
      <div>
      <Link to="/login">
      <button className="login_button">Login</button>
      </Link>
    <Link to="/signup">
    <button className="login_button">Signup</button>
   </Link>
   </div>
      }
      </section>
        </section>


{/* Displaying Search Results */}
<div className="search-results">
        {searchResult.length > 0 ? (
          searchResult.map((data) => (
            <div key={data._id} className="ad-item">
              <h4>{data.productName}</h4>
              <p>{data.category}</p>
              {/* Add other relevant fields to display */}
              <Link to={`/add/${data._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>


        <div className="banner-wraper">
          <img className="banner" src={banner}></img>
          <img className="banner" src={banner2}></img>
          <img className="banner" src={banner3}></img>
        </div>
        <div className="all_cat">
          <div>
            <img className="cat" src={business}></img>
            <p className="cat_headiing">Business</p>
          </div>
          <div>
            <img className="cat" src={furniture}></img>
            <p className="cat_headiing">Furniture</p>
          </div>
          <div>
            <img className="cat" src={fashion}></img>
            <p className="cat_headiing">Fashion</p>
          </div>
          <div>
            <img className="cat" src={electronics}></img>
            <p className="cat_headiing">Electronics</p>
          </div>
          <div>
            <img className="cat" src={books}></img>
            <p className="cat_headiing">Books</p>
          </div>
          <div>
            <img className="cat" src={animals}></img>
            <p className="cat_headiing">Animals</p>
          </div>
          <div>
            <img className="cat" src={bikes}></img>
            <p className="cat_headiing">Bikes</p>
          </div>
        </div>
       
</div>
);
};

export default Header