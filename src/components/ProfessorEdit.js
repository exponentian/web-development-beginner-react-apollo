import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import { getProfessorQuery, updateProfessorMutation } from '../queries';

class ProfessorEdit extends React.Component {
  state = {
    professorData: {
      id: '',
      name: '',
      number: '',
      department: '',
      position: ''
    },
    isReady: false,
    errors: {}
  };

  componentWillMount = () => {
    const { getProfessorQuery } = this.props;

    if (!getProfessorQuery.loading) {
      this.updateState(getProfessorQuery.professor);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { getProfessorQuery } = this.props;

    if (prevProps.getProfessorQuery.loading !== getProfessorQuery.loading) {
      this.updateState(getProfessorQuery.professor);
    }
  };

  updateState = data => {
    this.setState({
      professorData: { 
        ...this.state.professorData,
        id: data.id,
        name: data.name,
        number: data.number,
        department: data.department,
        position: data.position
      },
      isReady: true
    });
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
      this.props.updateProfessorMutation({
        variables: professorData,
        refetchQueries: [{ query: getProfessorQuery }]
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
    const { professorData, isReady, errors } = this.state;
    const { id, name, number, department, position } = professorData;
    
    if (!isReady) {
      return (
        <div>
          <Header />
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div>
          <Link to='/professors'>List</Link>{' > '}
          <Link to={`/professors/${id}`}>Detail</Link>{' > '}
          <span>Edit Professor</span>
        </div>

        <h2>Edit Professor</h2>
        

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Professor Name:</label>
            <input name="name" type="text" defaultValue={name} onChange={this.handleChange} />
            {!!errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div>
            <label htmlFor="number">Professor Number:</label>
            <input name="number" type="text" defaultValue={number} onChange={this.handleChange} />
            {!!errors.number && <ErrorMessage text={errors.number} />}
          </div>
          
          <div>
            <label htmlFor="department">Department:</label>
            <input name="department" type="text" defaultValue={department} onChange={this.handleChange} />
            {!!errors.department && <ErrorMessage text={errors.department} />}
          </div>

          <div>
            <label htmlFor="position">Position:</label>
            <select name="position" defaultValue={position} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="Instructor">Instructor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
              <option value="Full Professor">Full Professor</option>
            </select>
            {!!errors.position && <ErrorMessage text={errors.position} />}
          </div>
          
          <button type="submit">Update</button>
        </form>

      </div>
    );
  }
}

const ErrorMessage = ({ text }) => 
  <div style={ {'color': 'maroon', 'marginBottom': '10px'} }>{text}</div>;


export default compose(
  graphql(getProfessorQuery, {
    name: "getProfessorQuery",
    options: props => ({
      variables: {
        id: props.match.params.professorId
      }
    })
  }),
  graphql(updateProfessorMutation, { name: "updateProfessorMutation" })
)(ProfessorEdit);