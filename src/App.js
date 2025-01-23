import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import myImage from './assets/ilustracion2.png';
import { GoContainer, GoPencil, GoTrash  } from "react-icons/go";
import { TbTriangleSquareCircle } from "react-icons/tb";
import Formulario from "./components/Formulario";
import Items from "./components/Items";
import Header from "./components/Header";
import { Image } from "react-bootstrap";
import {Toaster, toast } from 'sonner';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Departament from "./pages/Departament";

import { v4 as uuidv4 } from 'uuid';

import './App.scss'
const URL = "http://localhost:3002/items"


function App() {

  const [items, setItems] = useState([]); 

  const[departamentTotal, SetdepartamentTotal] = useState([])

  useEffect(() => {

  localStorage.clear();
  const storedItems = JSON.parse(localStorage.getItem('items')) || [];
  
  setItems(storedItems);
  setFilteredItems(storedItems);

  const uniqueDepartaments = [...new Set(storedItems.map(item => item.departament))];
  SetdepartamentTotal(uniqueDepartaments);
    /*axios
      .get(URL)
      .then(response => {
        setItems(response.data);
        setFilteredItems(response.data);
        const uniqueDepartaments = [...new Set(response.data.map(item => item.departament))];
        SetdepartamentTotal(uniqueDepartaments);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setError("Failed to load items.");
      });*/
  }, [])

  const[name, setName] = useState('')
  const[departament, setDepartament] = useState('')
  const[total, setTotal] = useState('')
  const[description, setDescription] = useState('')
  const[departamentName, setDepartamentName] = useState('')
  

  

  const [searchValue, setSearchValue] = useState('');
  
  const [filteredItems, setFilteredItems] = useState(items);
  const [isFound, setIsFound] = useState(false);

  const[error, setError] = useState(null)

  const [editing, setEditing] = useState(null);

  const [editedName, setEditedName] = useState('');
  const [editedDepartament, setEditedDepartament] = useState('');
  const [editedTotal, setEditedTotal] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const [showModalItems, setShowModalItems] = useState(false);
  const [showModalDpto, setShowModalDpto] = useState(false);

  const handleShowItems = () => setShowModalItems(true);
  const handleShowDpto = () => setShowModalDpto(true);
;

  const handleCloseItems = () => setShowModalItems(false);
  const handleCloseDpto = () => setShowModalDpto(false);


const handleChangeName =(e) =>{
    e.preventDefault()
    setName(e.target.value)
    setError('');
}
const handleChangeDepartament =(e) =>{
  const value = e.target.value;
  setDepartament(value);
  setError('');
  
}
const handleChangeTotal =(e) =>{
  e.preventDefault()
  setTotal(e.target.value)
  setError('');
}
const handleChangeDescription =(e) =>{
  e.preventDefault()
  setDescription(e.target.value)
  setError('');
}
const handleChangeDptoName =(e) =>{
  e.preventDefault()
  const value = e.target.value;
  if (value.length <= 30) {
  setDepartamentName(value)
  setError('');
}
}

const handleAddItem = () => {
  if (!name || !departament || !total || !description) {
    setError("All fields are required.");
    return;
  }

  const itemsObject = {
      id: uuidv4(),
      name: name.trim(),
      departament: departament,
      total: total,
      description: description,
  };
  // Guardar el nuevo elemento en localStorage
    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
    existingItems.push(itemsObject);
    localStorage.setItem('items', JSON.stringify(existingItems));

    // Actualizar el estado de los elementos y otros estados
    setItems(existingItems); // Actualiza el estado con los elementos de localStorage
    SetdepartamentTotal(prevDepartaments => {
      if (!prevDepartaments.includes(departament)) {
        return [...prevDepartaments, departament];
      }
      return prevDepartaments;
    });

    toast.success('Item added successfully!'); // Mensaje de éxito
    setName('');
    setDepartament('');
    setTotal('');
    setDescription('');
    setError(null);
    setShowModalItems(false);
            /* axios.post("http://localhost:3002/items", itemsObject)
              .then(response => {
                  setItems(prevItems => [...prevItems, response.data]);
                  SetdepartamentTotal(prevDepartaments => {
                    if (!prevDepartaments.includes(departament)) {
                      return [...prevDepartaments, departament];
                    }
                    return prevDepartaments;
                    
                    
                  });
                  toast.success('Itme added successfully!');
                  setName('');
                  setDepartament('');
                  setTotal('');
                  setDescription('');
                  setError(null);
                  setShowModalItems(false);
              })
              .catch(err => {
                  console.error("Error adding item:", err);
                  toast.error('Item has not been created')
                  setError("Failed to add item.");
              });*/
}

const handleAddDpto = () => {
 
  if (!departamentName) {
    setError("The departament can't by empty"); 
    return;
  }
  
  const existingDepartaments = JSON.parse(localStorage.getItem('departaments')) || [];

  if (!existingDepartaments.includes(departamentName)) {
    existingDepartaments.push(departamentName);
    localStorage.setItem('departaments', JSON.stringify(existingDepartaments));

    SetdepartamentTotal(prevDepartaments => {
      return [...prevDepartaments, departamentName];
    });

    setShowModalDpto(false);
    toast.success('Departament added successfully!');
  } else {
    toast.error('Departament has not been created');
    setShowModalDpto(false);
  }

      /*SetdepartamentTotal(prevDepartaments => {
        if (!prevDepartaments.includes(departamentName)) {
          setShowModalDpto(false);
          toast.success('Departament added successfully!');
          return [...prevDepartaments, departamentName];
        }
        toast.error('Departament has not been created')
        setShowModalDpto(false);
        
        return prevDepartaments;
      });*/
};

const handleDelete = (id) => {
    const itemToDelete = items.find(item => item.id === id);
    
    if (!itemToDelete) {
        console.error("Item not found");
        return;
    }

    const { departament } = itemToDelete; 

    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
    const updatedItems = existingItems.filter(item => item.id !== id);

    localStorage.setItem('items', JSON.stringify(updatedItems));

    setItems(updatedItems);

    const currentDepartaments = updatedItems.map(item => item.departament);
    const uniqueDepartaments = [...new Set(currentDepartaments)];

    SetdepartamentTotal(uniqueDepartaments);
    toast.success('Item deleted successfully!');
  
    /*axios.delete(`http://localhost:3002/items/${id}`)
        .then(() => {
            
            setItems(prevItems => {
                const updatedItems = prevItems.filter(item => item.id !== id);

               
                const currentDepartaments = updatedItems.map(item => item.departament);
                const uniqueDepartaments = [...new Set(currentDepartaments)];

                SetdepartamentTotal(uniqueDepartaments);
                toast.success('Items deleted successfully!');
                return updatedItems;
            });
        })
        .catch(err => {
            console.error("Error deleting item:", err);
            toast.error('Item has not been deleted')
            setError("Failed to delete item.");
        });*/
}

const handleEdit = (id) => {
  const ItemsToEdit = items.find(item => item.id === id);
  
  if (ItemsToEdit) {
      
      setEditing(id);
      setEditedName(ItemsToEdit.name);
      setEditedDepartament(ItemsToEdit.departament);
      setEditedTotal(ItemsToEdit.total);
      setEditedDescription(ItemsToEdit.description);
      // Mostrar el modal para editar
      setShowModalItems(true);
      setError('');
  } else {
      console.error("Items not found");
      toast.error('Item has not been found')
  }
};

const handleSaveEdit = () => {
  if (!editedName || !editedDepartament || !editedTotal || !editedDescription) {
    setError("All fields are required.");
    return;
  }
  
  const itemsObject = {
    id: uuidv4(),
    name: editedName.trim(),
    departament: editedDepartament,
    total: editedTotal,
    description: editedDescription,
  };

  
  const existingItems = JSON.parse(localStorage.getItem('items')) || [];

  
  const updatedItems = existingItems.map(item =>
    item.id === editing ? itemsObject : item
  );

  
  localStorage.setItem('items', JSON.stringify(updatedItems));

  
  setItems(updatedItems);
  
  toast.success('Item edited successfully!'); 
  setEditing(null);
  setName('');
  setDepartament('');
  setTotal('');
  setDescription('');
  setError(null);
  setShowModalItems(false);
  /*// Enviar la solicitud PUT al servidor
  axios.put(`http://localhost:3002/items/${editing}`, itemsObject)
      .then(response => {
          // Actualizar el estado local con la nota editada
          setItems(prevItems => prevItems.map(item =>
            item.id === editing ? response.data : item
          ));
          toast.success('Items edited successfully!'); 
          setEditing(null)
          setName('');
          setDepartament('');
          setTotal('');
          setDescription('');
          setError(null);
          setShowModalItems(false);
      })
      .catch(err => {
          console.error("Error updating note:", err);
          toast.error('Item has not been edited')
          setError("Failed to update note.");
      });*/
}

const handleCancelEdit = () =>{
    setEditing(null);
    setName('');
    setError(null);
    setDepartament('');
    setTotal('');
    setDescription('');
    setShowModalItems(false);
}
const handleSearch = (term) => {

  setSearchValue(term);

  if (term.trim() === "") {
    
    setFilteredItems(items);
    setIsFound(false);
    return;
}

  const results = items.filter(item =>
    item.name.toLowerCase().includes(term.trim().toLowerCase()) || 
    item.departament.toLowerCase().includes(term.trim().toLowerCase()) || 
    item.description.toLowerCase().includes(term.trim().toLowerCase())
  );

  
  setFilteredItems(results);
  setIsFound(results.length > 0);
}

        return (
          <Router>
                <div className="main-container">

                    <Header 
                      searchValue={searchValue}
                      handleSearch={handleSearch}
                    />
                    <div className="options">

                      <div className="section-1">
                      <Toaster richColors  position="bottom-right" />
                          <Formulario 
                            name={name}
                            departament={departament}
                            total={total}
                            description={description}
                            departamentName={departamentName}
                            departamentTotal={departamentTotal}
                            onSearch={handleSearch}
                            showModalItems={showModalItems}
                            showModalDpto={showModalDpto}
                            handleCloseItems={handleCloseItems}
                            handleCloseDpto={handleCloseDpto}
                            handleShowItems={handleShowItems}
                            handleShowDpto={handleShowDpto}  
                            handleChangeName={handleChangeName}
                            handleChangeDepartament={handleChangeDepartament}
                            handleChangeTotal={handleChangeTotal}
                            handleChangeDescription={handleChangeDescription}
                            handleChangeDptoName={handleChangeDptoName}
                            setDepartament={setDepartament}
                            handleAddItem={handleAddItem}
                            handleAddDpto={handleAddDpto}
                            error={error}
                            setIsFound={setIsFound}
                            setSearchValue={setSearchValue}
                          />
                      </div>
                    </div>
                    <div className="contents">
                      <Routes>
                          <Route path="/ubicatodo" element=

                              {!isFound  ?  
                                  <div className='notes-box'>
                                      <div className='ilustration'>
                                        <div className='texto-ilustration'>
                                            <h1 className='texto1'>Hola</h1>
                                            <h4 className='texto2'>¿ Listo/a para empezar a ubicar todo ?  </h4>
                                        </div>
                                        <Image className="image-ilustration" src={myImage} alt="Ilustration" fluid/>
                                      </div>
                                      <div className='data'>
                                        <span>Data</span>
                                        <div className='box-data'>
                                            <div className='box-1'>
                                                <TbTriangleSquareCircle className="icon" />
                                                <p>Total Items</p>
                                                <p className="counter">{items.length}</p>
                                            </div>
                                            <div className='box-2'>
                                                <GoContainer className="icon" />
                                                <p>Total Dpto</p>
                                                <p className="counter">{departamentTotal.length}</p>
                                            </div>
                                        </div>
                                      </div>
                                  <Toaster richColors   position="bottom-right" />
                                    <Items 
                                      searchValue={searchValue}
                                      filteredItems={filteredItems}
                                      editedName={editedName}
                                      editedDepartament={editedDepartament}
                                      departamentTotal={departamentTotal}
                                      editedTotal={editedTotal}
                                      editedDescription={editedDescription}
                                      showModalItems={showModalItems}
                                      handleCloseItems={handleCloseItems}
                                      handleSaveEdit={handleSaveEdit}
                                      handleCancelEdit={handleCancelEdit}
                                      handleDelete={handleDelete}
                                      handleEdit={handleEdit}
                                      editing={editing}
                                      items={items}
                                      setEditedName={setEditedName}
                                      setEditedDepartament={setEditedDepartament}
                                      setEditedTotal={setEditedTotal}
                                      setEditedDescription={setEditedDescription}
                                      error={error}
                                    />
                                </div>
                              :
                                 <div className="items">
                                {
                                  filteredItems.map(item => (
                                    <div className="item" key={item.id}>
                                      <div className="all" key={item.id}>
                                          <div className='izq'>
                                              <Image src={myImage} className='img-items' fluid/>
                                              <div className='item-text'>
                                                  <h3>Items: {item.name}</h3>
                                                  <h3>Departament: {item.departament}</h3>
                                                  <h4>Total: {item.total}</h4>
                                                  <h5>Description: {item.description}</h5>
                                                </div>
                                          </div>
                                          <div className='options-items'>
                                            <GoPencil className="icon" onClick={() => handleEdit(item.id)}/>
                                            <GoTrash className="icon" onClick={() => handleDelete(item.id)}/>
                                          </div>
                                      </div>
                                    </div>
                                  ))
                                  }
                                </div>
                              }
                          />
                          <Route path="/departaments" element={<Departament
                                                                departamentTotal={departamentTotal}
                                                               />} 
                          />
                          <Route path="/items" element={<Items
                                                  searchValue={searchValue}
                                                  filteredItems={filteredItems}
                                                  editedName={editedName}
                                                  editedDepartament={editedDepartament}
                                                  editedTotal={editedTotal}
                                                  editedDescription={editedDescription}
                                                  showModalItems={showModalItems}
                                                  handleCloseItems={handleCloseItems}
                                                  handleSaveEdit={handleSaveEdit}
                                                  handleCancelEdit={handleCancelEdit}
                                                  handleDelete={handleDelete}
                                                  handleEdit={handleEdit}
                                                  editing={editing}
                                                  items={items}
                                                  setEditedName={setEditedName}
                                                  setEditedDepartament={setEditedDepartament}
                                                  setEditedTotal={setEditedTotal}
                                                  setEditedDescription={setEditedDescription}
                                                  error={error}
                                                />} 
                          />
                      </Routes>
                    </div>
                    <div className="footer">
                          <h1>Created by rey</h1>
                    </div>
                </div>
              
            </Router>
        )
}
export default App; 
