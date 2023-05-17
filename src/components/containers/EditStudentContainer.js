import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';

import {
 fetchStudentThunk,
 editStudentThunk,
} from "../../store/thunks";

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            campusId: null,
            email: "",
            gpa: null,
            imageUrl: "",
            redirect: false,
            redirectId: null
        };
    }

    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        //Checks for input error
        //Email has to have  valid form
        //First and last name can't be empty
        //GPA has to be a number and between 0 and 4
        let error = false;
        let errorMsg = "";
        let regNum = /[+-]?([0-9]*[.])?[0-9]+/;
        let regEmail = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!regEmail.test(event.target.email.value)){
            errorMsg += "Invalid email\n"
            error = true;
        }

        if(!event.target.firstname.value){
            errorMsg += "First name can't be empty\n"
            error = true;
        }

        if(!event.target.lastname.value){
            errorMsg += "Last name can't be empty\n"
            error = true;
        }

        if((!regNum.test(event.target.gpa.value) || event.target.gpa.value < 0 || event.target.gpa.value > 4) && event.target.gpa.value !== "") {
            errorMsg += "GPA has to be a number between 0 and 4";
            error = true;
        }

        //If input error is caught, nulls submit and returns alert
        if(error){
            alert(errorMsg);
            return false;
        }

        let student = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            campusId: event.target.campusId.value,
            email: event.target.email.value,
            gpa: event.target.gpa.value,
            imageUrl: event.target.imageUrl.value,
            id:this.props.student.id
        };

        let updatedStudent = await this.props.editStudent(student);

        this.setState({
            firstname:"",
            lastname:"",
            email: "",
            gpa: null,
            imageUrl: "",
            campusId:null,
            redirect:true,
        })

    }

    render() {
                if(this.state.redirect){
            return(
                <Redirect to = {`/students`}/>
            )
        }


        return(
            <div>
                <Header />
                <EditStudentView
                    student = {this.props.student}
                    handleSubmit = {this.handleSubmit}
                />
            </div>
        )
    }
}

const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "campus"
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);