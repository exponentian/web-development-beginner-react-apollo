import React from 'react';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import { 
  addCourseMutation, 
  getAllCoursesQuery,
  getAllProfessorsQuery
} from '../queries';

class AddCourse extends React.Component {
  state = {
    courseData: {
      name: '',
      number: '',
      department: '',
      position: ''
    },
    errors: {}
  };

  handleChange = e => {
    this.setState({
      courseData: { ...this.state.courseData, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    
    const { courseData } = this.state;
    const errors = this.formValidation(courseData);
    
    if ( Object.keys(errors).length < 1 ) {
      this.props.addCourseMutation({
        variables: courseData,
        refetchQueries: [{ query: getAllCoursesQuery }]
      });
      
    } else {
      this.setState({ errors: errors});
    }

  };

  formValidation = data => {
    const errors = {};

    if (data.name === "") errors.name = 'Invalid name';
    if (data.code === "") errors.code = 'Invalid code';
    if (data.description === "") errors.description = 'Invalid description';
    if (data.professor === "") errors.professor = 'Invalid professor';

    return errors;
  };

  render() {
    const { errors } = this.state;
    const { getAllProfessorsQuery } = this.props;

    if (getAllProfessorsQuery.loading) {
      return (
        <div>
          <Header />
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Add Course</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Course Name:</label>
            <input name="name" type="text" onChange={this.handleChange} />
            {!!errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div>
            <label htmlFor="code">Course Code:</label>
            <input name="code" type="text" onChange={this.handleChange} />
            {!!errors.code && <ErrorMessage text={errors.code} />}
          </div>
          
          <div>
            <label htmlFor="description">Description:</label>
            <input name="description" type="text" onChange={this.handleChange} />
            {!!errors.description && <ErrorMessage text={errors.description} />}
          </div>

          <div>
            <label htmlFor="professor">Professor:</label>
            <select name="professor" onChange={this.handleChange}>
              <option value="">Select</option>
              {getAllProfessorsQuery.professors.length > 0 ?
                getAllProfessorsQuery.professors.map((professor, i) => 
                  <option key={professor.id} value={professor.id}>{ professor.name }</option>) :
                'No professors found'}
            </select>
            {!!errors.professor && <ErrorMessage text={errors.professor} />}
          </div>

          <button type="submit">ADD</button>
        </form>
      </div>
    );
  }
}

const ErrorMessage = ({ text }) => 
  <div style={ {'color': 'maroon', 'marginBottom': '10px'} }>{text}</div>;

export default compose(
  graphql(addCourseMutation, { name: "addCourseMutation" }),
  graphql(getAllProfessorsQuery, {name: "getAllProfessorsQuery"})
)(AddCourse);