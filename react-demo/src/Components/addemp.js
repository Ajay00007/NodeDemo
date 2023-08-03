import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";
import './edit.css';


const Adduser = () => {
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [image, setImage] = useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { name, sex, dob, salary, department,image };
        dispatch(FunctionAddUser(userobj));
        navigate('/user');
    };

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm("Do you want to Logout?")) {
          navigate("/");
          
        }
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          setImage(base64String);
        };
      
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
      };  
    
      const renderUserImage = () => {
        if (image) {
          return (
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt="User"
              className="user-image"
              style={{height:60, width:60}}
            />
          );
        }
        return null;
      };

    

    return (
        <div className="form-1">

<nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"Teal",fontFamily:"serif",fontSize:"25px"}}>
          <Link to={'/'} style={{marginLeft:"100px"}}>Home</Link>
          &nbsp;
          <Link to={'/user'}>Employees</Link>
          &nbsp;
          <Link to={'/user/add'}>AddEmployee</Link>
          &nbsp;
          <Link to={'/'} onClick={logout}>Logout</Link>
          &nbsp;
        </nav>

            <form onSubmit={handlesubmit}>
                <div className="card" >
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Add Employee</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-lg-8" >
                                <div className="form-group" >
                                    <label>Name</label>
                                    <input value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="form-control" 
                                    required
                                    placeholder="Enter Employee Name"></input>
                                </div>
                            </div>
                            
                <div className="col-lg-12">
                    <div className="form-group radio-div">
                      <label>Sex: </label> 
                      <input
                        required
                        value="M"
                        type="radio"
                        onChange={e => setSex(e.target.value)}
                        name="gender"
                        className="radio-btn"
                      />
                      Male 
                      <input
                        required
                        value="F"
                        type="radio"
                        onChange={e => setSex(e.target.value)}
                        name="gender"
                        className="radio-btn"
                      />
                      Female
                    </div>
                  </div>
                            
                <div className="col-lg-8">
                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                </div>
                            {/* <div className="col-lg-8">
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input 
                                    value={salary} 
                                    onChange={(e) => setSalary(e.target.value)} 
                                    className="form-control"
                                    required></input>
                                </div>
                            </div> */}
                            <div className="col-lg-8">
    <div className="form-group">
        <label>Salary</label>
        <input 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)} 
            className="form-control"
            type="number" // Use the "number" input type
            step="0.01"   // Optionally specify step value
            required
        />
    </div>
</div>

                            <div className="col-lg-8">
                                <div className="form-group">
                                    <label>Department</label>
                                    <select 
                                    value={department}
                                    onChange={e => setDepartment((e).target.value)}
                                    className="form-control"
                                    required
                                    >
                                        <option value="None"></option>
                                        <option value="Sales">Sales</option>
                                        <option value="HR">HR</option>
                                        <option value="Accounts">Accounts</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12">
                  <div className="form-group">
                    <label>Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                      // required
                    />
                    {renderUserImage()}
                    <small className="form-text text-muted">Choose a profile photo</small>
                  </div>
                </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left' }}>
                        <button className="btn btn-primary" type="submit">Submit</button> |
                        <Link className="btn btn-danger" to={'/user'}>Back</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Adduser;