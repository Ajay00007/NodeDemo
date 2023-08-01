import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";
import './edit.css';

const Updateuser = () => {
    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [sex, sexchange] = useState('');
    const [dob, dobchange] = useState('');
    const [salary, salarychange] = useState('');
    const [department, departmentchange] = useState('');
    const [image, imageChange] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const userobj=useSelector((state)=>state.user.userobj)


    const handlesubmit = (e) => {
        e.preventDefault();
        const userobj = { id, name, sex, dob, salary, department,image };
        dispatch(FunctionUpdateUser(userobj,id));
        navigate('/user');
    };

    useEffect(() => {
        dispatch(FetchUserObj(code));
    }, [code,dispatch])

    useEffect(() => {
        if(userobj){
            idchange(userobj.id);
            namechange(userobj.name);
            sexchange(userobj.sex);
            sexchange(userobj.dob);
            salarychange(userobj.salary);
            departmentchange(userobj.department);
            imageChange(userobj.image || null);

        }
    }, [userobj])

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm("Do you want to Logout?")) {
          navigate("/");
        }
      };

      const isRadio = (val) => {
        if (val === sex) {
          return true;
        }
        return false;
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          imageChange(base64String);
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
                <div className="card">
                    <div className="card-header" style={{ textAlign: 'left' }}>
                        <h2>Edit Employee</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="form-group">
                                    <label>Id</label>
                                    <input value={id || ''}
                                     disabled="disabled" 
                                     className="form-control">
                                     </input>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name || ''}
                                    onChange={(e) => namechange(e.target.value)} 
                                    className="form-control"
                                    required>
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                    <div className="form-group radio-div">
                      <label>Sex: </label>
                      <input
                        required
                        value="M"
                        // checked={sex === "M"}
                        type="radio"
                        onChange={(e) => sexchange(e.target.value)}
                        name="sex"
                        className="radio-btn"
                        checked={isRadio("M")}
                      />
                      Male 
                      <input
                        required
                        value="F"
                        // checked={sex === "F"}
                        type="radio"
                        onChange={(e) => sexchange(e.target.value)}
                        name="sex"
                        className="radio-btn"
                        checked={isRadio("F")}
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
                        value={dob || ""}
                        onChange={(e) => dobchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                </div>  
                            <div className="col-lg-8">
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input required value={salary || ''} onChange={(e) => salarychange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="form-group">
                                    <label>department</label>
                                    <select required value={department || ''} onChange={(e) => departmentchange(e.target.value)} className="form-control">
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
                    />
                    {renderUserImage()}
                    <small className="form-text text-muted">Choose a profile photo.</small>
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

export default Updateuser;