import Header from "../../../components/Header"
import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import axios from "axios";
import { baseUrl } from "../../../shared/constant";
import { Modal, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./index.css"

const { confirm } = Modal;

const AddsPage = () =>{
   const [adds, setAdds] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
      setLoading(true);
      axios
      .get(`${baseUrl}/adds/all-adds`)
      .then((res)=>{
         setAdds(res.data);
      })
      .catch((err)=>{})
      .finally(()=>{
         setLoading(false);
      });
   },[]);

   const onDelete = (add) =>{
      confirm({
         title: 'Delete this add?',
         icon: <ExclamationCircleFilled/>,
         content: 'Are you sure delete this add?',
         onOk() {
            console.log("OK");
            return axios
            .delete(`${baseUrl}/adds/delete-adds/${add._id}`)
            .then((res)=>{
               console.log("🚀 ~ .then ~ res:", res);
            if (res.data?.error) {
              alert(res.data?.message);
            } else {
              const filteredData = adds.filter((bl) => bl?._id !== add?._id);
              setAdds(filteredData);
            }
            })            
            .catch((err)=>{
               console.log("🚀 ~ onOk ~ err:", err);
            alert(err?.message);
            });
         },
         onCancel() {
            console.log("Cancel");
         }
      })
   };

 return(
    <>
    <Header/>
    <div className="add_list">
      {loading ? (
        <Spin size="large" />
      ) : adds.length ? (
        adds.map((add) => (
          <Card add={add} onDelete={() => onDelete(add)} />
        ))
      ) : (
        <h3>No Adds Yet</h3>
      )}
    </div>
    </>
 )    
}
 
export default AddsPage;