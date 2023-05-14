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
            redirect: false,
            redirectId: null
        };
    }

    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        let student = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            campusId: event.target.campusId.value,
            id:this.props.student.id
        };

        let updatedStudent = await this.props.editStudent(student);

        this.setState({
            firstname:"",
            lastname:"",
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