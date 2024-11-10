import React from 'react'
import './index.css';

import ItemsList from './ItemsList';

const Content = ({items, handleCheck, handleDelete}) => {
    
    return (
        <main>
          {items.length ? (
          <ItemsList 
            items = {items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
          ) : (
            <p style={{marginTop:'2rem'}}>Your list is empty</p>
          )}
        </main>  
    )
}

export default Content
