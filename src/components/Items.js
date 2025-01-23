import React from 'react';
import { Button, Modal, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Items.scss'
import myImage from '../assets/ilustracion2.png';
import { GoPencil, GoTrash  } from "react-icons/go";


function NuevasNotas({ editedName, editedDepartament, editedTotal, departamentTotal,  editedDescription, showModalItems, handleCloseItems, handleSaveEdit,
                       handleCancelEdit, handleDelete, handleEdit, editing, items, setEditedName, setEditedDepartament,
                       setEditedTotal, setEditedDescription, error}) {

                        
        return (
            
                  <div className='items'>
                    {
                        items.map(item => 
                            (
                            <div className='item' key={item.id}>
                                {editing === item.id ? (
                                    
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
                                                            value={editedName}  
                                                            placeholder="Write something"
                                                            onChange={(e) => setEditedName(e.target.value)}  />
                                                        </div>
                                                        <div className="form-group">
                                                        <label htmlFor="departament-select" className="col-form-label">Departament:</label>
                                                        <select 
                                                            className="form-control" 
                                                            id="departament-select"
                                                            value={editedDepartament}
                                                            onChange={(e) => setEditedDepartament(e.target.value)}
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
                                                            value={editedTotal}  
                                                            placeholder="Write a number"
                                                            onChange={(e) => setEditedTotal(e.target.value)}  />
                                                        </div>
                                                        <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label">Descriptions:</label>
                                                        <textarea 
                                                            className="form-control" 
                                                            id="message-text"
                                                            value={editedDescription}
                                                            onChange={(e) => setEditedDescription(e.target.value)}
                                                            placeholder="Write something more about the item"
                                                        >
                                                        </textarea>
                                                        </div>
                                                    </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCancelEdit}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleSaveEdit}>
                                                        Add Items
                                                    </Button>
                                                    
                                                    </Modal.Footer>
                                                    <div className='error'>
                                                    {
                                                    
                                                    error && <p>{error}</p>
                                                    
                                                    }
                     </div>
                                        </Modal>
                             ):(
                                    <div className='all'>
                                        <div className='izq'>
                                            <img className='img-items'
                                                src={myImage} 
                                                alt="Preview" 
                                            />
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
                                 )}
                            </div>
                        ))
                    }
                  </div>
        );
    }
    
    export default NuevasNotas;