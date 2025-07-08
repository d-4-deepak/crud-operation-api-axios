import React, { useEffect, useState } from 'react'
import '../App.css'
import { deletePost, getPost } from '../api/PostApi';
import Form from './Form';

const PostCard = () => {
  const [data,setData] = useState([]);

  const getPostData = async()=>{
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
    
  }

  useEffect(()=>{
    getPostData()
  },[]);

  //function to delete post

  const handleDeletePost = async (id)=>{
    try {
      const res = await deletePost(id);

      console.log(res);

      if(res.status ===200){
        const newUpdatedposts = data.filter((curPost)=>{
          return curPost.id !== id;
        })
        setData(newUpdatedposts);

      }
    } catch (error) {
      console.log(error);
      
    }
  
    
  }

  return (
      <>
      <section className='section-form'>
        <Form data={data} setData={setData}/>
      </section>
    <section className='section-post '>
      <ol>
        {data.map((curElem)=>{
          const {id,body,title} = curElem;
          return <li key={id}>
            
            <p>Title:{title}</p>
            <p>Body:{body}</p>
            <button>Edit</button>
            <button className='btn-delete' onClick={()=>handleDeletePost(id)} >Delete</button>
          </li>
        })}
      </ol>
    </section>
    </>
  )
}

export default PostCard
