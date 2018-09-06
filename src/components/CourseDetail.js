import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Header from './Header';
import { getCourseQuery } from '../queries';


class CourseDetail extends React.Component {
  render() {
    const { data } = this.props;
    const { course } = data;

    if ( data.loading ) {
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
          <span>Detail of Course</span>
        </div>
        
        <h2>Detail of Course</h2>

        <table>
          <tbody>
            <tr>
              <td>Course Name:</td>
              <td>{course.name}</td>
            </tr>
            <tr>
              <td>Course Code:</td>
              <td>{course.code}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{course.description}</td>
            </tr>
            <tr>
              <td>Professor:</td>
              <td>{course.professor.name} ({ course.professor.position })</td>
            </tr>
          </tbody>
        </table>
        
        <Link to={`/courses/${course.id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default graphql(getCourseQuery, {
  options: props => ({
    variables: {
      id: props.match.params.courseId
    }
  })
})(CourseDetail);