//import AddsPage from "../../routes/Home/AddsPage"
//
//const MyAdd = () =>{
//  return(
//    <AddsPage/>
//  )
//}
//export default MyAdd
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../shared/constant";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { Modal, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Header from "../../components/Header"

const { confirm } = Modal;

const MyAdd = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [adds, setAdds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      axios
        .get(`${baseUrl}/adds/get-my-add/${user?._id}`)
        .then((res) => {
          // Ensure adds is set to an empty array if res.data.adds is undefined
          setAdds(res?.data?.add || []); // If adds is undefined, set it to an empty array
        })
        .catch((err) => {
          console.error("Error fetching adds:", err);
          alert("Error fetching ads. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?._id]);

  const onDelete = (add) => {
    confirm({
      title: "Delete this add?",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to delete this add?",
      onOk() {
        return axios
          .delete(`${baseUrl}/adds/delete-adds/${add._id}`)
          .then((res) => {
            if (res.data?.error) {
              alert(res.data?.message);
            } else {
              const filteredData = adds.filter((bl) => bl?._id !== add?._id);
              setAdds(filteredData);
            }
          })
          .catch((err) => {
            console.error("Error deleting add:", err);
            alert("Failed to delete add. Please try again.");
          });
      },
      onCancel() {
        console.log("Deletion canceled");
      },
    });
  };

  return (
    <>
    <Header/>
    <div className="add_list">
      {loading ? (
        <Spin size="large" />
      ) : adds.length ? (
        adds.map((add) => (
          <Card key={add._id} add={add} onDelete={() => onDelete(add)} />
        ))
      ) : (
        <>
        <Header/>
        <h3>No Adds Yet</h3>
        </>
      )}
    </div>
    </>
  );
};

export default MyAdd;







//import axios from "axios";
//import { useEffect, useState } from "react";
//import { baseUrl } from "../../shared/constant";
//import { useSelector } from "react-redux";
//import Card from "../../components/Card";
//import { Modal, Spin } from "antd";
//import { ExclamationCircleFilled } from "@ant-design/icons";
//
//const { confirm } = Modal;
//
//const MyAdd = () =>{
//    const { user } = useSelector((s) => s.userReducer);
//
//  const [adds, setAdds] = useState([]);
//  const [loading, setLoading] = useState(false);
//
//  useEffect(()=>{
//    setLoading(true);
//  axios
//  .get(`${baseUrl}/adds/get-my-add/${user?._id}`)
//  //.get(`${baseUrl}/adds/get-my-add/${author?.id}`)
//  .then((res)=>{
//    setAdds(res?.data?.adds);
//  })
//  .catch((err)=>{})
//  .finally(() => {
//    setLoading(false);
//  });
//},[user?._id])
//
//const onDelete = (add)=>{
//    confirm({
//        title: "Delete this add?",
//        icon: <ExclamationCircleFilled />,
//        content: "Are you sure you want to delete this add?",
//        onOk() {
//            return axios
//            .delete(`${baseUrl}/adds/delete-adds/${add._id}`)
//            .then((res)=>{
//                console.log(".then ~ res:", res);
//                if (res.data?.error) {
//                  alert(res.data?.message);
//                } else {
//                  const filteredData = adds.filter((bl) => bl?._id !== add?._id);
//                  setAdds(filteredData);
//                }  
//            })
//            .catch((err) => {
//                console.log("🚀 ~ onOk ~ err:", err);
//                alert(err?.message);
//              });
//        },
//        onCancel() {
//            console.log("cancel");
//            
//        }
//    })
//}
//    return(
//        <>
//        <div className="blog-list">
//        {loading ?(
//            <Spin size="large"/>
//    ) : adds.length ? (
//        adds.map((add)=>(
//            <Card add={add} onDelete={()=> onDelete(add)} />
//        ))
//    ) : (
//        <h3>No Adds Yet</h3>
//    )}{" "}
//        </div>
//        </>
//    )
//}
//
//export default MyAdd;