import React from 'react'
import "./style.css"

function Modal({children}) {

    return (
        <div className="modal-container">
            <div className="modal-contents">
                {children}
            </div>
        </div>
    )
}

export default Modal
