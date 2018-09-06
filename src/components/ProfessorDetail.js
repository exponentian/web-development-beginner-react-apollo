import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Header from './Header';
import { getProfessorQuery } from '../queries';


class ProfessorDetail extends React.Component {
  render() {
    const { data } = this.props;
    const { professor } = data;

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
          <Link to='/professors'>List</Link>{' > '}
          <span>Detail of Professor</span>
        </div>
        
        <h2>Detail of Professor</h2>

        <table>
          <tbody>
            <tr>
              <td>Professor Name:</td>
              <td>{professor.name}</td>
            </tr>
            <tr>
              <td>Professor Number:</td>
              <td>{professor.number}</td>
            </tr>
            <tr>
              <td>Department:</td>
              <td>{professor.department}</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>{professor.position}</td>
            </tr>
            <tr>
              <td>Teaching courses:</td>
              <td>
                {professor.courses.length === 0 ? 
                  'None' :
                  professor.courses.map(course => <div key={course.id}>{course.name} ({course.code})</div>)}
              </td>
            </tr>
          </tbody>
        </table>
        
        <Link to={`/professors/${professor.id}/edit`}>Edit</Link>  
      </div>
    );
  }
}

export default graphql(getProfessorQuery, {
  options: props => ({
    variables: {
      id: props.match.params.professorId
    }
  })
})(ProfessorDetail);