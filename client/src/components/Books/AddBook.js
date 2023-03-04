import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookAction } from '../../redux/actions/books/bookActions';

const AddBook = () => {

    const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();

    const data = {
      name,
      author,
      price,
      description
    };
    dispatch(createBookAction(data));
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <button
            type='button'
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#exampleModal'>
            Click to add Book.
          </button>

          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Create Book
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <h1 className='text-center'>Add Book</h1>
                  <form onSubmit={handleFormSubmit}>
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
                      <button type='submit' className='btn btn-warning m-auto'>
                        Create Book
                      </button>
                    </fieldset>
                  </form>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-danger'
                    data-dismiss='modal'>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;