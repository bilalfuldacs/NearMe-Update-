import logo from './logo.svg';
import './App.css';
import Login from './components/login/LoginForm';
import Signup from './components/signup/SignupForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/pages/RootNavigation';
import { Provider } from 'react-redux'; // Import the Provider component
import store from './store/Store'; // Import your Redux store
import CreateEvent from './components/pages/createEvent';
import DisplayEvent from './components/pages/dispplayEvents';
import DisplaySingleEvent from './components/pages/displaySingleEvent';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create/event" element={<CreateEvent />} />
          <Route path="/display/event" element={<DisplayEvent/>} />
          <Route path="/events/:eventName" element={<DisplaySingleEvent />} />
          {/* Add more routes as needed */}
        </Routes>
        </Layout>
      </Router>
      
    </Provider>
  );
}

export default App;
