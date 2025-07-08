import React, { useState } from 'react'
import '../App.css'
import { postData } from '../api/PostApi'
const Form = ({data,setData}) => {
    const [addData,setAddData] = useState({
        title:"",
        body:""
    })
    const handleInputChange = (e)=>{
            const name = e.target.name;
            const value = e.target.value;

            setAddData((prev)=>{
                console.log(prev);
                return {
                    ...prev,
                    [name]:value
                }
                
            })
    }

    const addPostData= async (addData)=>{
        const res = await postData(addData)
        if(res.status===201){
            setData([...data,res.data]);
            setAddData({title:"",body:""})
        }
    }

    const handleFormSubmit =(e)=>{
        e.preventDefault();
        addPostData(addData);
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor='title'></label>
            <input
            type='text'
            autoComplete='off'
            id='title'
            name='title'
            placeholder='Add Tittle'
            value={addData.title}
            onChange={handleInputChange}
            />
       
      </div>

      <div>
        <label htmlFor='body'></label>
            <input
            type='text'
            autoComplete='off'
            id='body'
            name='body'
            placeholder='Add post'
            value={addData.body}
            onChange={handleInputChange}
            />
       
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default Form
