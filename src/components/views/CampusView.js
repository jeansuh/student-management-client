/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
    const {campus, deleteStudent, handleDelete} = props;

    if (!campus.students.length) {
    let msg = "There are no students enrolled at " + campus.name;
    return(
        <div>
        <br/>
            <img src={campus.imageUrl} width = "150"/>
            <h1>{campus.name}</h1>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
            <Link to={`/editcampus/${campus.id}`}>
                <button style={{marginRight:"10px"}}>Edit Campus</button>
            </Link>
            <Link to = {`/campuses`}>
                <button onClick={() => {
                    props.deleteCampus(campus.id);
                }}> Delete Campus </button>
            </Link>
            <br/>
            <p><b>{msg}</b></p>
            <Link to={`/newstudent`}>
                <button>Add New Student</button>
            </Link><br/>
            <div>
                <br />
                <Link to={`/campuses`}>Go back</Link>
            </div>
        </div>
    )
    }
    
    // Render a single Campus view with list of its students
    return (
    <div>
        <br/>
        <img src={campus.imageUrl} width = "150"/>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        <Link to={`/editcampus/${campus.id}`}>
            <button style={{marginRight:"10px"}}>Edit Campus</button>
        </Link>
        <Link to = {`/campuses`}>
            <button onClick={() => {
                props.deleteCampus(campus.id);
            }}> Delete Campus </button>
        </Link>

        {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
            <div key={student.id} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
            </Link>          
            <button style={{ display: "inline-block", height: "23px", marginLeft:"10px" }} onClick={() => handleDelete(student.id)}>Delete</button>   
            </div>
        );
        })}
        <Link to={`/newstudent`}>
        <button>Add New Student</button>
        </Link>
        <div><br /><Link to={`/campuses`}>Go back</Link></div>
    </div>
    );
};

export default CampusView;