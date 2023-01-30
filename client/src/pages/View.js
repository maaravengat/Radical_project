import React,{useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import './View.css';




const View = () => { 


    const [user, setUser] = useState({});

    const {id} =useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>setUser({...resp.data[0]}))
    },[id]); 

    return(
        

        
        <div style={{marginTop:"100px"}}>
            <div className="Card">
                <div className="Card-header">
                <h2> User Contact Details</h2>
                
                    <div class="container">
                        <strong>Id:</strong>
                        <span>{id}</span>
                        <br />
                        <br />
                       
                        <strong>Name:</strong>
                        <span>{user.name}</span>
                        <br />
                        <br />
                        <strong>Email:</strong>
                        <span>{user.email}</span>
                        <br />
                        <br />
                        <strong>Contact:</strong>
                        <span>{user.contact}</span>
                        <br />
                        <br />
                        <Link to="/">
                            <button>Go Back</button>
                        </Link>
                    </div>
                
            </div>
        
        </div>
        </div>
    )
}

export default View;