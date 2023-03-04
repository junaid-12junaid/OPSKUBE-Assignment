import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = ({ history }) => {
  const { id } = useParams();

  //Get the book details and fill it in the form
  const bookDetails = useSelector(state => state.bookDetails);

  const { book, loading } = bookDetails;

  const [name, setName] = useState(book && !loading && book.category);

  const [author, setAuthor] = useState(book && book.author);
  const [price, setPrice] = useState(book && book.price);
  const [description, setDescription] = useState(book && book.description);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  //dispatch action

  const formSubmitHandler = e => {
    const data = {
        name,
      author,
      price,
      description
    };
    e.preventDefault();
    dispatch(updateBook(id, data));
    history.push('/books');
  };
  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {book ? (
            <>
              <h1 className='text-center'>Update</h1>
              <form onSubmit={formSubmitHandler}>
                <fieldset>
                  
                <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Book Name</label>
                        <input
                        value={name}
                        onChange={e=>setName(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Name'
                        />
                      </div>
                     
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Author</label>
                        <input
                        value={author}
                        onChange={e=>setAuthor(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='Author'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Price</label>
                        <input
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='Price'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>description</label>
                        <input
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='description'
                        />
                      </div>
                  <button type='submit' className='btn btn-dark m-auto'>
                    Create Book
                  </button>
                </fieldset>
              </form>
            </>
          ) : (
            'No'
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;