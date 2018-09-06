import { gql } from 'apollo-boost';


// professors
export const getAllProfessorsQuery = gql`
{
  professors {
    id
    name
    number
    department
    position
    courses {
      id
      name
      code
    }
  }
}
`;

export const getProfessorQuery = gql`
query ($id: ID) {
  professor(id: $id) {
    id
    name
    number
    department
    position
    courses {
      id
      name
      code
    }
  }
}
`;

export const addProfessorMutation = gql`
mutation ($name: String!, $number: String!, $department: String!, $position: String!) {
  addProfessor(
    name: $name,
    number: $number,
    department: $department,
    position: $position
  ) {
    id
    name
    number
    department
    position
  }
}
`;

export const updateProfessorMutation = gql`
mutation ($id: ID!, $name: String, $number: String, $department: String, $position: String) {
  updateProfessor(
    id: $id,
    name: $name,
    number: $number,
    department: $department,
    position: $position
  ) {
    id
    name
    number
    department
    position
  }
}
`;


export const removeProfessorMutation = gql`
mutation ($id: ID!) {
  removeProfessor(id: $id) {
    id
    name
    number
    department
    position
  }
}
`;



// courses

export const getAllCoursesQuery = gql`
{
  courses {
    id
    name
    code
    description
    professor {
      id
      name
      number
      department
      position
    }
  }
}
`;

export const getCourseQuery = gql`
query ($id: ID) {
  course(id: $id) {
    id
    name
    code
    description
    professor {
      id
      name
      number
      department
      position
    }
  }
}
`;


export const addCourseMutation = gql`
mutation ($name: String!, $code: String!, $description: String!, $professor: ID!) {
  addCourse(
    name: $name,
    code: $code,
    description: $description,
    professor: $professor
  ) {
    id
    name
    code
    description
    professor {
      id
      name
      number
      department
      position
    }
  }
}
`;


export const updateCourseMutation = gql`
mutation ($id: ID!, $name: String, $code: String, $description: String, $professor: ID) {
  updateCourse(
    id: $id,
    name: $name,
    code: $code,
    description: $description,
    professor: $professor
  ) {
    id
    name
    code
    description
    professor {
      id
      name
      number
      department
      position
    }
  }
}
`;

export const removeCourseMutation = gql`
mutation ($id: ID!) {
  removeCourse(id: $id) {
    id
    name
    code
    description
    professor {
      id
      name
      number
      department
      position
    }
  }
}
`;