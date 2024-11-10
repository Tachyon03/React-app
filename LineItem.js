import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'


const LineItem = ({item, handleCheck, handleDelete}) => {
  return (
<li className='item'>
                  <input
                  type= 'checkbox'
                  onChange={()=>handleCheck(item.id)}
                  checked = {item.checked}>
                  </input>
                 
                  <label 
                  style ={(item.checked)?{textDecoration:'line-through'}:null}
                  onDoubleClick={()=>handleCheck(item.id)}>{item.item}
                  </label>
                  
                  <button>
                    <FaTrashAlt
                     role="button"
                     onClick={()=>handleDelete(item.id)}
                     tabIndex="0"
                     aria-label={`Delete ${item. item}`}
                     />  
                  </button>
                </li>  
  )
}

export default LineItem
