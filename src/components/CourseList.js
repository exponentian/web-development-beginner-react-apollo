import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import AddCourse from './AddCourse';
import { 
  getAllCoursesQuery,
  removeCourseMutation
} from '../queries';


class CourseList extends React.Component {

  handleRemove = courseId => {
    this.props.removeCourseMutation({
      variables: { id: courseId },
      refetchQueries: [{ query: getAllCoursesQuery }]
    });
  };

  render() {
    const { getAllCoursesQuery } = this.props;

    if (getAllCoursesQuery.loading) {
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

        <AddCourse />
        <h2>List of Courses</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>By professor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {getAllCoursesQuery.courses.length > 0 ?
            getAllCoursesQuery.courses.map((course, i) => 
              <Course key={course.id}
                index={i}
                course={course}
                handleRemove={this.handleRemove}
              />
            ) :
            <tr span="6">
              <td>No courses found</td>
            </tr>}
          
          </tbody>
        </table>
      </div>
    );
  }
}

const Course = ({ index, course, handleRemove }) => (
  <tr key={course.id}>
    <td>{ index + 1 }</td>
    <td>{ course.name }</td>
    <td>{ course.code }</td>
    <td>{ course.description }</td>
    {
      course.professor ?
      <td>{ course.professor.name } ({ course.professor.position })</td> :
      <td>None</td>  
    }
    <td>
      <Link to={`/courses/${course.id}`}>Detail</Link>{' '}
      <Link to={`/courses/${course.id}/edit`}>Edit</Link>{' '}
      <button onClick={() => handleRemove(course.id)}>Remove</button>
    </td>
  </tr>
);

export default compose(
  graphql(getAllCoursesQuery, {name: "getAllCoursesQuery"}),
  graphql(removeCourseMutation, {name: "removeCourseMutation"})
)(CourseList);