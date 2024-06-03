// Modal.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CustomItemModal = ({ modalShow, setModalShow, onSave }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && image) {
      onSave(name, image);
    }
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Custom Item
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label  htmlFor="image">Image:</label>
            <input
              className="form-control"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Save</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CustomItemModal;
