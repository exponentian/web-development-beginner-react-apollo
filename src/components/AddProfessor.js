import React from 'react';
import { graphql } from 'react-apollo';
import { addProfessorMutation, getAllProfessorsQuery } from '../queries';

class AddProfessor extends React.Component {
  state = {
    professorData: {
      name: '',
      number: '',
      department: '',
      position: ''
    },
    errors: {}
  };

  handleChange = e => {
    this.setState({
      professorData: { ...this.state.professorData, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    
    const { professorData } = this.state;
    const errors = this.formValidation(professorData);
    
    if ( Object.keys(errors).length < 1 ) {
      this.props.addProfessorMutation({
        variables: professorData,
        refetchQueries: [{ query: getAllProfessorsQuery }]
      });
    } else {
      this.setState({ errors: errors});
    }

  };

  formValidation = data => {
    const errors = {};

    if (data.name === "") errors.name = 'Invalid name';
    if (data.number === "") errors.number = 'Invalid number';
    if (data.department === "") errors.department = 'Invalid department';
    if (data.position === "") errors.position = 'Invalid position';

    return errors;
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h2>Add Professor</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Professor Name:</label>
            <input name="name" type="text" onChange={this.handleChange} />
            {!!errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div>
            <label htmlFor="number">Professor Number:</label>
            <input name="number" type="text" onChange={this.handleChange} />
            {!!errors.number && <ErrorMessage text={errors.number} />}
          </div>
          
          <div>
            <label htmlFor="department">Department:</label>
            <input name="department" type="text" onChange={this.handleChange} />
            {!!errors.department && <ErrorMessage text={errors.department} />}
          </div>

          <div>
            <label htmlFor="position">Position:</label>
            <select name="position" onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="Instructor">Instructor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
              <option value="Full Professor">Full Professor</option>
            </select>
            {!!errors.position && <ErrorMessage text={errors.position} />}
          </div>

          <button type="submit">ADD</button>
        </form>
      </div>
    );
  }
}

const ErrorMessage = ({ text }) => 
  <div style={ {'color': 'maroon', 'marginBottom': '10px'} }>{text}</div>;

export default graphql(addProfessorMutation, { name: "addProfessorMutation" })(AddProfessor);