import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProfessorList from './ProfessorList';
import ProfessorDetail from './ProfessorDetail';
import ProfessorEdit from './ProfessorEdit';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import CourseEdit from './CourseEdit';
import Landing from './Landing';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/professors/:professorId/edit' component={ProfessorEdit} />
      <Route path='/professors/:professorId' component={ProfessorDetail} />
      <Route path='/professors' component={ProfessorList} />
      <Route path='/courses/:courseId/edit' component={CourseEdit} />
      <Route path='/courses/:courseId' component={CourseDetail} />
      <Route path='/courses' component={CourseList} />
      <Route exact path='/' component={Landing} />
    </Switch>
  </BrowserRouter>
);

export default App;