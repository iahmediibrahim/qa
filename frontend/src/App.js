import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Questions from './Components/Questions/Questions';
import Question from './Components/Question/Question';
import NewQuestion from './Components/NewQuestion/NewQuestion';
import SecuredRoute from './Components/SecuredRoute/SecuredRoute';
import Callback from './Callback';

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Questions} />
      <Route exact path="/question/:questionId" component={Question} />
      <Route exact path="/callback" component={Callback} />
      <SecuredRoute path="/new-question" component={NewQuestion} />
    </div>
  );
}

export default App;
