import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList,Removeuser} from "../Redux/Action";

import { useNavigate } from "react-router-dom";


const Userlisting = (props) => {
const nav = useNavigate();
    useEffect(() => {
        props.loaduser();
    }, [])

    const handledelete = (index) => {
        if (window.confirm('Do you want to remove?')) {
             props.removeuser(index);
             toast.success('Employee removed successfully.')
             props.loaduser(); 
        }
    };

    const logout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure want to Logout?")) {
          nav("/");
        }
      };
      const renderUserImage = (item) => {
        if (item.image && typeof item.image === 'string') {
          const blobData = atob(item.image);
          const arrayBuffer = new ArrayBuffer(blobData.length);
          const uintArray = new Uint8Array(arrayBuffer);
          for (let i = 0; i < blobData.length; i++) {
            uintArray[i] = blobData.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
      
          const base64String = URL.createObjectURL(blob);
          return (
            <img
              src={base64String}
              alt="User"
              className="user-image"
            //   alt="User" 
              style={{height:60, width:60,borderRadius:"50%"}}
            />
          );
        } else if (item.image && Array.isArray(item.image)) {
          const base64String = btoa(String.fromCharCode.apply(null, item.image));
          return (
            <img
              src={`data:image/jpeg;base64,${base64String}`}
              alt="User"
              className="user-image custom-image-style"
              style={{height:60, width:60,borderRadius:"50%"}}
            />
          );
        }
        return null;
      };
      
    return (
        props.user.loading ? <div><h2>Loading...</h2></div> :
            props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :

                <div>
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

                    <div className="card-1">
                        <div className="card-header" >
                            <Link to={'/user/add'} className="btn btn-success" style={{marginBottom: "10px",marginRight:"140px"}}>Add Employee</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td>ID</td>
                                        <td>Profile Photo</td>
                                        <td>Name</td>
                                        <td>Sex</td>
                                        <td>DOB</td>
                                        <td>Salary</td>
                                        <td>Department</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.user.userlist && props.user.userlist.map((item, id)=>
                                            <tr key={id}>
                                                <td>{id}</td>
                                                <td>{renderUserImage(item)}</td>
                                                <td>{item.name}</td>
                                                <td>{item.sex}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.salary}</td>
                                                <td>{item.department}</td>

                                                <td>
                                                    <Link to={'/user/edit/' + item.id} className="btn btn-primary">Edit</Link> |
                                                    <button onClick={() => {handledelete(item.id)}} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>

                            </table>

                            <div>
             
            </div>

                        </div>

                    </div>
                </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchUserList()),
        removeuser:(code)=>dispatch(Removeuser(code)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);