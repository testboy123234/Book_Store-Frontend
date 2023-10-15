import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';
// import BookEditModal from './BookEditModal';


const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl gap-y-8'>
     <div className="row ">
     <div className="my-3">
      <div class="aspect-h-4 aspect-w-1  hidden overflow-hidden rounded-lg sm:block ">
                <img
                  src={book.imgUrl}
                  alt="Two each of gray, white, and black shirts laying flat."
                  class=" h-full w-full object-cover object-center"
                />
              </div>
      </div>
      <div className="p-4 rounded-lg ring-1 ring-gray-200  ">
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {book.publishYear}
      </h2>
      <h4 className='my-2 text-gray-500'>{book._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' /> 
           {/* //onClick={() => setEditModal(true)} */}
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
      {/* {editModal && (
        <BookEditModal id={book.id} onClose={() => setEditModal(false)} />
      )} */}
      </div>
     
     </div>
    </div>
  );
};

export default BookSingleCard;