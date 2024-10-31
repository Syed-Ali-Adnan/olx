import iphone from "./assets/iphone.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const Card = (props) => {
  const { add, onDelete } = props;
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
 
  const handleEdit = () => {
    if (add?._id) {
      navigate(`/create-add?addId=${add?._id}`);
    }
  };

  if (!add) {
    // Render a fallback UI if 'add' is undefined
    return <div className="card">Loading...</div>;
  }

  return (
    <div className="card_wrapper">
    <div className="card">
      <div>
        <img
          className="product_img"
          src={add.image || iphone} // Use default image if add.image is missing
          alt={add.productName || "Product image"}
        />
      </div>
      <h3 className="price">RS.{add.productPrice}</h3>
      <p className="product_name">{add.productName}</p>
      <p className="description">{add.description}</p>
      <p className="description">Karachi, Pakistan</p>
      <div>
        <p className="created-at">
          {add.createdAt ? moment(add.createdAt).fromNow() : "Date unavailable"}
        </p>
      </div>
      <div className="buy_btn">
        {add.author?._id === user?._id && (
          <div className="action-button">
            <button className="edit_btn" onClick={handleEdit}>Edit</button>
            <button className="del_btn" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Card;

//import iphone from "./assets/iphone.png";
//import moment from "moment";
//import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
//import "./index.css";
//
//const Card = (props) => {
//  const add = props.add;
//  const { user } = useSelector((s) => s.userReducer);
//  const navigate = useNavigate();
//  const handleEdit = () => {
//    navigate(`/create-adds?addId=${add?._id}`);
//  };
//  return (
//    <>
//      <div className="card">
//        <div>
//          <img className="product_img" alt="product picture" src={add.image || iphone}></img>
//        </div>
//        <h3 className="price">{add.productPrice}</h3>
//        <p className="product_name">{add.productName}</p>
//        <p className="description">{add.description}</p>
//        <p className="description">Karachi,Pakistan</p>
//        <div>
//          <p className="created-at">{moment(add.createdAt).fromNow()}</p>
//        </div>
//        <div className="buy_btn">
//        {add.author._id === user._id ? (
//        <div className="action-button">
//          <button onClick={handleEdit}>Edit</button>
//          <button type="primary" onClick={props.onDelete}>Delete</button>
//        </div>
//      ) : null}
//        </div>
//      </div>
//      
//    </>
//  );
//};

//export default Card;
