import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Posts from './pages/Posts';
import SinglePost from './pages/SinglePost';

const propsMessage = 'Hello from';

function App() {
  return (
    <div className='container mx-auto my-4'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Posts
                propsMessage={propsMessage}
                componentName={'Posts Component'}
              />
            }
          />
          <Route
            path='/posts'
            element={
              <Posts
                propsMessage={propsMessage}
                componentName={'Posts Component'}
              />
            }
          />
          <Route
            path='/posts/:id/:userId'
            element={
              <SinglePost
                propsMessage={propsMessage}
                componentName={'SinglePost Component'}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
