import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import AddProfessor from './AddProfessor';
import { 
  getAllProfessorsQuery,
  removeProfessorMutation
} from '../queries';


class ProfessorList extends React.Component {

  handleRemove = professorId => {
    this.props.removeProfessorMutation({
      variables: { id: professorId },
      refetchQueries: [{ query: getAllProfessorsQuery }]
    });
  };

  render() {
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
        <Header />

        <AddProfessor />
        <h2>List of Professors</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Number</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {getAllProfessorsQuery.professors.length > 0 ?
            getAllProfessorsQuery.professors.map((professor, i) => 
              <Professor key={professor.id}
                index={i}
                professor={professor}
                handleRemove={this.handleRemove}
              />
            ) :
            <tr span="6">
              <td>No professors found</td>
            </tr>}
          
          </tbody>
        </table>
      
      </div>
    );
  }
}

const Professor = ({ index, professor, handleRemove }) => (
  <tr key={professor.id}>
    <td>{ index + 1 }</td>
    <td>{ professor.name }</td>
    <td>{ professor.number }</td>
    <td>{ professor.department }</td>
    <td>{ professor.position }</td>
    <td>
      <Link to={`/professors/${professor.id}`}>Detail</Link>{' '}
      <Link to={`/professors/${professor.id}/edit`}>Edit</Link>{' '}
      <button onClick={() => handleRemove(professor.id)}>Remove</button>
    </td>
  </tr>
);


export default compose(
  graphql(getAllProfessorsQuery, {name: "getAllProfessorsQuery"}),
  graphql(removeProfessorMutation, {name: "removeProfessorMutation"})
)(ProfessorList);