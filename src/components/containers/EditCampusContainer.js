import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';

import {
 fetchCampusThunk,
 editCampusThunk,
} from "../../store/thunks";

class EditCampusContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			description: "",
			imageUrl:"",
			redirect: false,
			redirectId: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}

 	componentDidMount() {
    	// Get campus ID from URL (API link)
    	this.props.fetchCampus(this.props.match.params.id);
  	}

	// handleChange = (event) => {
	// 	this.setState({
	// 		[event.target.name] : event.target.value
	// 	});
	// }

	handleSubmit = async (event) => {
		event.preventDefault();

    let error = false;
    let errorMsg = "";

    if(!event.target.name.value){
        errorMsg += "Campus name can't be empty\n"
        error = true;
    }

    if(!event.target.address.value){
        errorMsg += "Address can't be empty\n"
        error = true;
    }

    if(error){
        alert(errorMsg);
        return false;
    }

		let campus ={
			name: event.target.name.value,
			address: event.target.address.value,
			description: event.target.description.value,
			imageUrl: this.props.campus.imageUrl,
			id: this.props.campus.id,
		}
		// let campus = {
		// 	name: this.state.name,
		// 	address: this.state.address,
		// 	description: this.state.description,
		// 	id: this.props.campus.id,
		// };

		let updatedCampus = await this.props.editCampus(campus);

		this.setState({
			name: "",
			address: "",
			description: "",
			imageUrl:"",
			redirect: true,
			redirectId: campus.id
		})

	}

	componentWillMount(){
		this.setState({
			name: "",
			address: "",
			description: "",
			redirect: false, redirectId: null});
	}

	render(){
		if(this.state.redirect){
			return(
				<Redirect to = {`/campus/${this.state.redirectId}`}/>
			)
		}

		return(
			<div>
				<Header/ >
				<EditCampusView
					campus = {this.props.campus}
					handleSubmit = {this.handleSubmit}
				/>
			</div>
		)
	}
}

const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);