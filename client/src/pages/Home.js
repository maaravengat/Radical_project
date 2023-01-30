import "./Home.css";
import { useState, useParams, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Home = () => {
    const [data, setData]= useState([]);

    const loadData= async ()=>{
        const response=await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };
    useEffect(()=>{
        loadData();

    },[]);

    const deleteContact = (id) => {
        if(window.confirm("sure you want to delete")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("delete succesfully");  
            setTimeout(()=> loadData(), 500);
        }

    }
    return(
        <div style={{marginTop:"150px"}} >
            <Link to ="/addcontact">
                <button className="btn btn-contact">Add Contact</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style ={{textAlign:"center"}}>No</th>
                        <th style ={{textAlign:"center"}}>Name</th>
                        <th style ={{textAlign:"center"}}>Email</th>
                        <th style ={{textAlign:"center"}}>Contact</th>
                        <th style ={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map ((item,index)=> {
                        return(
                            <tr key={item.id}>
                                <td scope="row">{index+1 }</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={(e)=>deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                    <button className="btn btn-view">view</button>
                                    </Link>
                                </td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>
            
            </div>
     
    );
};

export default Home;