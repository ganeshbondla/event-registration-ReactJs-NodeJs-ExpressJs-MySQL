import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



const Register = () =>
{
    const[name,setname] = useState("");
  
  const[email,setemail] =useState("");
  const[number,setnumber] =useState("");
  const[password,setpassword] =useState("");
  const saveDetails =(e) =>{
    e.preventDefault();
   let newRegister={
        username:name,
        useremail:email,
        usermobile:number,
        userpassword:password,
    };
    console.log(newRegister);
  }

    return(
        <div>
           <Header />
                    <div className="container p-3 mt-3">
                        <div className="row">
                            <div className="col-md-6 mb-2">
                               <img className="img-fluid" src="./Images/Register.png" />
                            </div>
                            <div className="col-md-6 mb-2 my-auto">
                                <div className="p-4 border rounded shadow">
                                    <div className="text-center">
                                        <h4><b>Register</b></h4>
                                    </div>
                                    <hr />
                                    <form onSubmit={saveDetails}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name" 
                                            onChange={(e) =>setname(e.target.value)} />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" 
                                             onChange={(e) =>setemail(e.target.value)} />
                                        </div>
                                        <div class="form-group">
                                            <input type="number" class="form-control" id="mobile" aria-describedby="mobileHelp" placeholder="Enter Mobile" 
                                            onChange={(e) =>setnumber(e.target.value)} />
                                        </div>
                                        <div class="form-group">    
                                            <input type="password" class="form-control" id="password" placeholder="Enter Password" 
                                            onChange={(e) =>setpassword(e.target.value)} />
                                        </div>
                                        <button type="submit" class="btn btn-success btn-block">Register</button>
                                    </form>
                                        <hr />
                                <div className="row">
                                        <div className="col-6 mb-2 mx-auto ">
                                            <small>Have already an account? <Link to="/Login">Login Now</Link></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
         </div>
  )
    
}
export default Register;
