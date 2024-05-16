// CustomModal.js
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, content }) => (
  
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <button className="btn btn-success" onClick={onRequestClose}>
      Close &rarr;
    </button>
    <br/>
    <div className="row mt-3">
      <div className="offset-0 col-12">
        <h3>
          Export Search Data?
        </h3>
        <p>
          This feature is coming! Once its ready, you can filter down the results,
          and then export the fields you want to an CSV. 
        </p>
        <p>
          Sorry its not ready. I know that building your target list 
          takes time and getting access to raw data can be helpful
          for finding signal.
        </p>
        <p>
          To get updates when this is ready, connect with me on LinkedIn. And add note 
          to the message to let me know you want access to the export feature.
        </p>
        <button className="btn btn-primary w-sm-100 justify-content" onClick={() => window.open('https://www.linkedin.com/in/stephansmithbc93/', "_blank")}>
          Connect on LinkedIn
        </button>
      </div>
    </div>
  </Modal>
);

export default CustomModal;