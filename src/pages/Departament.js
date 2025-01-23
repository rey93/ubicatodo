import React from "react";
import './Departament.css'

function Departament({ departamentTotal }){
        
        return (
            <div className="departament">
                <h1>Departaments</h1>
                <div className="boxs-departament">
                        {
                        departamentTotal.map((departament, index) => (
                            <div className="box"  key={index}>
                            <h2>{departament}</h2>
                            </div>
                        ))
                        }
                </div>
            </div>
        );
    
}

export default Departament;
