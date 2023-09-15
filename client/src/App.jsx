import React from 'react';
import PostList from './components/PostList';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route path='/posts/:id' element={<h1>Test</h1>} />
      </Routes>
    </div>
  );
};

export default App;
