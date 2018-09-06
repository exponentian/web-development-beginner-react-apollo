import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import { 
  getCourseQuery, 
  updateCourseMutation,
  getAllProfessorsQuery
} from '../queries';


class CourseEdit extends React.Component {

  state = {
    courseData: {
      id: '',
      name: '',
      code: '',
      description: '',
      professor: ''
    },
    isReady: false,
    errors: {}
  };

  componentWillMount = () => {
    const { getCourseQuery } = this.props;

    if (!getCourseQuery.loading) {
      this.updateState(getCourseQuery.course);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { getCourseQuery } = this.props;

    if (prevProps.getCourseQuery.loading !== getCourseQuery.loading) {
      this.updateState(getCourseQuery.course);
    }
  };

  updateState = data => {
    this.setState({
      courseData: {
        ...this.setState.courseData,
        id: data.id,
        name: data.name,
        code: data.code,
        description: data.description,
        professor: data.professor.id
      },
      isReady: true
    });
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
      this.props.updateCourseMutation({
        variables: courseData,
        refetchQueries: [{ query: getCourseQuery }]
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
    const { courseData, isReady, errors } = this.state;
    const { id, name, code, description, professor } = courseData;
    const { getAllProfessorsQuery } = this.props;

    if (!isReady || getAllProfessorsQuery.loading) {
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
          <Link to='/courses'>List</Link>{' > '}
          <Link to={`/courses/${id}`}>Detail</Link>{' > '}
          <span>Edit Course</span>
        </div>

        <h2>Edit Course</h2>
        
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Course Name:</label>
            <input name="name" type="text" defaultValue={name} onChange={this.handleChange} />
            {!!errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div>
            <label htmlFor="code">Course Code:</label>
            <input name="code" type="text" defaultValue={code} onChange={this.handleChange} />
            {!!errors.code && <ErrorMessage text={errors.code} />}
          </div>
          
          <div>
            <label htmlFor="description">Description:</label>
            <input name="description" type="text" defaultValue={description} onChange={this.handleChange} />
            {!!errors.description && <ErrorMessage text={errors.description} />}
          </div>

          <div>
            <label htmlFor="professor">Professor:</label>
            <select name="professor" defaultValue={professor} onChange={this.handleChange}>
              <option value="">Select</option>
              {getAllProfessorsQuery.professors.length > 0 ?
                getAllProfessorsQuery.professors.map((professor, i) => 
                  <option key={professor.id} value={professor.id}>{ professor.name }</option>) :
                'No professors found'}
            </select>
            {!!errors.professor && <ErrorMessage text={errors.professor} />}
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
  graphql(getCourseQuery, {
    name: "getCourseQuery",
    options: props => ({
      variables: {
        id: props.match.params.courseId
      }
    })
  }),
  graphql(updateCourseMutation, { name: "updateCourseMutation" }),
  graphql(getAllProfessorsQuery, { name: "getAllProfessorsQuery" })
)(CourseEdit);