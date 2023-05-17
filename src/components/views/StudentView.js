/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view 
  return (
    <div>
      <br/>
      <img src={student.imageUrl} width="150" />
      <h1>{student.firstname + " " + student.lastname}</h1>
      {(()=> {
        if(student?.campus){
          return(
            <div>
              <Link to={`/campus/${student.campus.id}`}>
              <h2>{student.campus.name}</h2>
          </Link>
            </div>
          )
        } else {
          return(
            <div>
              <h3>The student is not enrolled at any campus.</h3>
            </div>
          )
        }
      })()}
      <p><b>GPA:</b> {student.gpa}</p>
      <p><b>Email:</b> {student.email}</p>
      <Link to={`/editstudent/${student.id}`}>
        <button style={{marginRight:"10px"}}>Edit</button>
      </Link>
      <Link to={`/students/`}>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
    </div>
  );

};

export default StudentView;