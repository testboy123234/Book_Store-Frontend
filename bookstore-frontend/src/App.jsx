import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Upload from './pages/Upload';
import CreateBookc from './pages/CreateBookc';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/u' element={<Upload />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/createc' element={<CreateBookc />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default App;