import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from '../redux/postSlice';

export const Post = () => {
  const [title, setTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  const posts = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();

  const handleEditClick = (postId) => {
    setIsEdit(true);
    setId(postId);
  };

  const handleUpdateClick = (postId, updatedTitle) => {
    dispatch(updatePost({ id: postId, title: updatedTitle }));
    setIsEdit(false);
  };

  return (
    <>
      <div className='text-center'>
        <input
          className='border-black border-[4px] w-[400px]'
          type="text"
          name=""
          id=""
          placeholder='Add a daily Activity'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="submit"
          onClick={() => {
            dispatch(addPost({ id: posts.length + 1, title }));
            setTitle("");
          }}
          className="mt-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Add 
        </button>
      </div>

      {posts.length > 0 &&
        posts.map((post) => (
          <div className="border-black border-[4px] w-[700px] ml-[300px]" key={post.id}>
            {isEdit && id === post.id ? (
              <div>
                <input
                className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mb-4 mt-2"
                  type="text"
                  name="updatedTitle"
                  id="updatedTitle"
                  placeholder="Enter updated Activity"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button  onClick={() => handleUpdateClick(post.id, updatedTitle)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Update</button>


                <button  onClick={() => setIsEdit(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            ) : (
              <div>
                <h1 className="text-[30px] font-semibold">{post.title}</h1>
                <button
                  onClick={() => handleEditClick(post.id)}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
    </>
  );
            }