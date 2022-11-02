import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStudent from './components/ListStudent';
import CreateStudent from './components/CreateStudent';
function App() {
  return (
    <div>
      <Router>

        <div className="container">
          <Switch>

            <Route exact path="/" component={ListStudent} />
            <Route exact path="/add-student/:no" component={CreateStudent}/>

          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;
