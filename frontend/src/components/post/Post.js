import moment from 'moment'
import './Post.css'
import React, { useState } from 'react';


const Post = ({post, onLike, onComment}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    onLike(post._id);
  };

  const formattedTime = moment(post.time).fromNow();
  const handleComment = (event) => {
    event.preventDefault();
    onComment(post._id, newComment);
    setNewComment('');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  return (
    <article data-cy="post" key={ post._id }>
      <div className='post-container'>
        <div className='name-container'>
          <div className='name'> 
            { post.firstName + " "} 
            { post.lastName} 
            
          </div>
        </div>
        <div className='message-container'>
        <div className='message'> { post.message } </div>
        </div>
          <div className="button-container">
            <button className='like-button' onClick={handleLike}>👍 | { post.like }</button>
              <button onClick={toggleComments}>
                { showComments ? 'Hide Comments' : `💬 (${post.comments.length})` }
              </button>
          </div>
        {showComments && (
        <>
        <div className='comment-container'>
            {post.comments.map(comment => 
              <p key={comment._id}>
                <strong>{comment.author.name}:</strong> {comment.comment} 
                <br />
                <small>{new Date(comment.date).toLocaleString()}</small>
              </p>
            )}
          <form onSubmit={handleComment}>
            <label>
              New Comment:
              <input type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
            </label>
            <button type="submit">Comment</button>
          </form>
        </div>
        </>
      )}
      <div className='time'> { formattedTime } </div>
      </div>
        
        
 
    </article>
       )
  }



export default Post;
