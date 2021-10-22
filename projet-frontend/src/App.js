import Home from './ui/Home'
import { BrowserRouter as Router, Route } from "react-router-dom"
import SignIn from './ui/SignIn'
import SignUp from './ui/SignUp'
import ForgotPassword from './ui/ForgotPassword'

function App() {
  return (
    <Router>
      <div>
        
        <Route path='/' exact render={(props) => (
          <Home />
        )} />

        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/forgot-password' component={ForgotPassword} />

      </div>
    </Router>
  );
}

export default App;
