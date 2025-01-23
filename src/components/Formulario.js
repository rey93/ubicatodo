import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Formulario.scss'
import { Button, Modal } from "react-bootstrap";
import { IoHomeOutline, IoAddCircleOutline  } from "react-icons/io5";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { GoContainer } from "react-icons/go";
import { useNavigate } from "react-router-dom";



function Formulario({ name, departament, total, description, departamentName, departamentTotal, handleChangeName, setDepartament,
                      handleChangeTotal, handleChangeDescription, handleChangeDptoName, handleAddItem, handleAddDpto, 
                      error, showModalItems, showModalDpto, handleCloseItems, handleCloseDpto, handleShowItems, 
                      handleShowDpto, setIsFound, setSearchValue}) {
    
    const navigate = useNavigate();
    const handleDepartamentosClick = () => {
        navigate("/departaments");
    };
    
    const handleItemsClick = () => {
        navigate("/items");
    };
    const handleAppClick = () => {
        setSearchValue('')
        setIsFound(false)
        navigate("/");
    };
                               

    return (

        <div className="options-container">
            
            <div className='option-item-add'>
                <div className='addActions' onClick={handleShowDpto}>
                    <h1>Add a new Dpto</h1>
                    <div className='icon1'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32z"></path>
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32z"></path>
                    </svg>
                    </div>

                </div>
                <div className='addActions' onClick={handleShowItems}>
                    <h1>Add a new Item</h1>
                    <div className='icon2'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32z"></path>
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32z"></path>
                    </svg>
                    </div>

                </div>
            </div>
            <div className="option-item">
                <IoHomeOutline className="icon" />
                <h1  onClick={handleAppClick} >Dashboard</h1>
            </div>
            <div className="option-item">
                <GoContainer className="icon" />
                <h1 onClick={handleDepartamentosClick}>Departamentos</h1>
            </div>
            <div className="option-item">
                <TbTriangleSquareCircle className="icon" />
                <h1 onClick={handleItemsClick}>Items</h1>
            </div>

                <Modal show={showModalItems} onHide={handleCloseItems} animation={true}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Items</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                        <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                        <input type="text"  
                            className="form-control" 
                            id="recipient-name"
                            value={name}  
                            placeholder="Write something"
                            onInput={handleChangeName}  />
                        </div>
                        <div className="form-group">
                        <label htmlFor="departament-select" className="col-form-label">Departament:</label>
                        <select 
                            className="form-control" 
                            id="departament-select"
                            value={departament}
                            onChange={(e) => setDepartament(e.target.value)}
                        >
                            <option value="">Select a department</option> 
                            {departamentTotal.map((dept, index) => (
                                <option key={index} value={dept}>{dept}</option> 
                            ))}
                        </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Total items:</label>
                        <input type="number"  
                            className="form-control" 
                            id="recipient-name"
                            value={total}  
                            placeholder="Write a number"
                            onInput={handleChangeTotal}  />
                        </div>
                        <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Descriptions:</label>
                        <textarea 
                            className="form-control" 
                            id="message-text"
                            value={description}
                            onChange={handleChangeDescription}
                            placeholder="Write something more about the item"
                        >
                        </textarea>
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseItems}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddItem}>
                        Add Item
                    </Button>
                    
                    </Modal.Footer>
                    <div className='error'>
                    {
                     
                       error && <p>{error}</p>
                     
                     }
                     </div>

                </Modal>

                <Modal show={showModalDpto} onHide={handleCloseDpto} animation={true}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Departament</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <form>
                            <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                            <input type="text"  
                                className="form-control" 
                                id="recipient-name"
                                value={departamentName}  
                                placeholder="Write departartament name"
                                onChange={handleChangeDptoName}  />
                            </div>
                        </form>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDpto}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddDpto}>
                            Add Departament
                        </Button>
                    </Modal.Footer>
                    <div className='error'>
                    {
                     
                       error && <p>{error}</p>
                     
                     }
                     </div>
                </Modal>
        </div>
         

    );
}

export default Formulario;
