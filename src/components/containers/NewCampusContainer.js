import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			address: "",
			description: "",
			imageUrl:"",
			redirect: false,
			redirectId: null
		};
	}

	//function to handle changes in form and update state
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	//Function to handle form submit
	handleSubmit = async event => {
		event.preventDefault();

		//Checks for input error
		//If campus name or adress is empty, nulls the submit and returns alert messages accordingly
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

		let campus = {
			name: this.state.name,
			address: this.state.address,
			description: this.state.description,
			imageUrl: this.state.imageUrl
		};

		let newCampus = await this.props.addCampus(campus);

		this.setState({
			name: "",
			address: "",
			description: "",
			imageUrl:"",
			redirect: true,
			redirectId: newCampus.id
		});
	}

	componentWillUnmount() {
		this.setState({redirect:false, redirectId: null});
	}

	render() {
		if(this.state.redirect) {
			return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
		}

		return(
			<div>
				<Header/ >
				<NewCampusView
					handleChange = {this.handleChange}
					handleSubmit = {this.handleSubmit}
				/>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return({
		addCampus: (campus) => dispatch(addCampusThunk(campus)),
	})
}

export default connect(null,mapDispatch)(NewCampusContainer);