import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Poll from './pages/poll';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />}/>
          <Route exact path='/auth' element={< Auth />}/>
          <Route exact path='/poll' element={< Poll />}/>

          {/* Not found */}
          <Route path='*' element={ <Navigate to="/404" /> } />
          <Route path='/404' element={< NotFound />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
