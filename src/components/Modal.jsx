import React from 'react';
import { useState } from 'react';

const Modal = ({ animate }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <button
        onClick={() => setToggle(!toggle)}
        className="w3-button w3-green w3-round-xxlarge"
      >
        Open Modal
      </button>
      <div
        style={toggle ? { display: 'block' } : { display: 'none' }}
        className={`w3-modal ${animate}`}
      >
        <div className="w3-modal-content w3-round">
          <div className="w3-container">
            <span
              id="span"
              onClick={() => setToggle(!toggle)}
              className="w3-button w3-display-topright"
            >
              &times;
            </span>
            <p>Some text in the Modal..</p>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
