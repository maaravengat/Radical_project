import { useEffect, useState } from "react";
import axios from "axios";
import { toast   } from "react-toastify";
import { useHistory,useParams,Link } from "react-router-dom";
import "./AddEdit.css"

const initialState={
    name: "",
    email: "",
    contact:  "",
};
const AddEdit = () => {

    const [state, setState]=useState(initialState);

    const {name, email, contact}= state; 
    
    const history =useHistory();

    const {id}= useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>setState({...resp.data[0]}))
    },[id]); 

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!name || !email || !contact){
            toast.error("please provide input fields")
        } else{
            if(!id){
                axios.post("http://localhost:5000/api/post ",{
                    name,
                    email,
                    contact
                }).then(()=>{
                    setState({name:"" , email:"" ,  contact:""})
                }).catch((err)=>toast.error(err.response.data));
                toast.success("Contact Added successfully")

            } else{
                axios.put(`http://localhost:5000/api/Update/${id}`,{
                    name,
                    email,
                    contact,
                }).then(()=>{
                    setState({name:"" , email:"" ,  contact:""})
                }).catch((err)=>toast.error(err.response.data));
                toast.success("Contact Updated successfully")


            }
           
            setTimeout(() =>  history.push("/"),500);
        }
    };
    const handleInputChange=(e)=>{
        const {name, value}=e.target;
        setState({...state, [name]:value});
    };
    return(
        <div>
            <h1>Add Your Contact</h1>
            <form style={{margin:"100px"
           }}
            onSubmit={handleSubmit}
        >
                <label> Enter Your Name:</label>
                <input type="text"
                name="name"
                id="name"
                 placeholder="YourName.."
                 value={name || ""}
                 onChange={handleInputChange}/>

                <label> Enter Your Email:</label>
                <input type="email" 
                name="email"
                id="email"placeholder="email@.com."
                 value={email ||""}
                 onChange={handleInputChange}/>

                 <label> Enter Your Contact:</label>
                <input type="number"
                name="contact"
                id="conttact" placeholder="Contact Number.."
                 value={contact ||""}
                 onChange={handleInputChange}/>
                <input type="submit" value={id?"Update":"save"}/>
                <Link to="/">
                <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}
export default AddEdit;