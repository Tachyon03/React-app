import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Content from "./Content.js";
import { useState, useEffect } from "react";
import AddItem from "./AddItem.js";
import SearchItem from "./SearchItem.js";
import apiRequest from "./apiRequest.js";


function App() 
{
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todo');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetch, setfetch] = useState(null)
  const [Loading, setLoading] = useState(true)


useEffect(() => {
  const fetch = async () => {
    try{
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("data not recieved");
      const listitems = await response.json(); 
      console.log(listitems)
      setItems(listitems);
      setfetch(null)
    }
    catch(err){
      setfetch(err.Message)
    }finally {
      setLoading(false)
    }
  }


setTimeout (() => {
  (async () => await fetch())()
},2000)
}, []) 

  const addItem = async (item) => {
  const id = items.length ? items[items.length - 1 ].id 
  +1 : 1;
  const addNewItem = {id, checked:false, item}
  const listItems = [...items, addNewItem]
  setItems(listItems)
  localStorage.setItem("todo", JSON.stringify(listItems))
    
  const postOptions = { 
      method : 'POST',
      headers: {
        'content-Type' : 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = apiRequest(API_URL,postOptions)
    if(result) setfetch(result)
}

  
  const handleCheck = (id) =>{
      const lst = items.map((item)=>item.id===id ? {...item,checked:!item.checked} : item)
      setItems(lst)

      const myIt = lst.filter((item) => item.id===id)
      const updateOptions = { 
        method : 'PATCH',
        headers: {
          'content-Type' : 'application/json'
        },
        body: JSON.stringify({checked: myIt[0].checked})
      }

      const reqUrl = `${API_URL}/${id}`
      const result = apiRequest(reqUrl, updateOptions)
      if(result) setfetch(result)
      
  }

  const handleDelete = (id)=>{
    const lstit = items.filter((item) => item.id!==id)
    setItems(lstit)

    const deleteOptions ={method : 'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result = apiRequest(reqUrl, deleteOptions)
    if(result) setfetch(result)
      
    localStorage.setItem("todo", JSON.stringify(lstit))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }

  return(
  <div className="App">
    <Header title="To-Do list"/>
    <AddItem 
    newItem = {newItem}
    setNewItem = {setNewItem}
    handleSubmit = {handleSubmit}
    />

    <SearchItem 
     search = {search}
     setSearch={setSearch}
    />

   <Content
    items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
    handleCheck={handleCheck}
    handleDelete={handleDelete}/>


    <Footer 
     length={items.length}
    />
  </div>
  );
}

export default App;
