import React from "react";
import './Header.css'
import myImageLogo from '../assets/UbicaTodoLogo.png';
import { BsSearch } from "react-icons/bs";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({searchValue, handleSearch }){
      
     const navigate = useNavigate();
      const handleHomeClick = () => {
          navigate("/");
      };
      
        return (
            <div className="header">
            <div className="logo-texto" onClick={handleHomeClick} >
              <Image className="image-logo" src={myImageLogo} alt="UbicaloTodo" fluid/>
              <h1 className="logo-name" >
                <span className="ubica">Ubica</span>
                <span className="todo">Todo</span>
              </h1>
            </div>
              <form className="form-search">
                  <div className="input-group">
                      <input type="text"
                      className="form-control"
                      aria-label="Buscar" 
                      maxLength="128"
                      id="search"
                      value={searchValue}
                      onChange={(e) => handleSearch(e.target.value)} 
                      placeholder="Search..." 
                      autoFocus required />
                      <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                          <BsSearch/>
                          </button>
                      </div>
                  </div>
              </form>
          </div>
        );
    
}

export default Header;
