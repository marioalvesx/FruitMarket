import { useState, useEffect } from 'react'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import appLogo from './assets/WatermelonAmico.svg';

function App() {
  const baseURL = ""

  const [data, setData] = useState([]);
  const [modalInclude, setModalInclude] = useState(false);
  const [modalMultiply, setModalMultiply] = useState(false);
  const [modalDivide, setModalDivide] = useState(false);

  const [selectedFruit, setSelectedFruit] = useState({
    id: '',
    description: '',
    valueA: '',
    valueB: '',
    result: ''
  });

  const selectFruit = (fruit, option) => {
    setSelectedFruit(fruit);
    option == "multiply" ? 
      openCloseModalMultiply() : openCloseModalDivide();
  }

  const openCloseModalInclude = () => {
    setModalInclude(!modalInclude)
  }

  const openCloseModalMultiply = () => {
    setModalMultiply(!modalMultiply)
  }
  
  const openCloseModalDivide = () => {
    setModalDivide(!modalDivide)
  }

  const handleChange = e=>{
    const { name, value } = e.target;
    setSelectedFruit({
      ...selectedFruit,
      [name]: value,
    });
    console.log(selectedFruit);
  }

  const getRequest = async() => {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const postRequest = async() => {
    delete selectedFruit.id;
    await axios
      .post(baseURL, selectedFruit)
      .then((response) => {
        setData(data.concat(response.data));
        openCloseModalInclude();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const multiplyRequest = async() => {    
    await axios
    .put(baseURL+"/"+selectedFruit.id+"/multiply",selectedFruit)
      .then((response) => {
        var responseData = response.data;
        var auxiliarData = data;
        auxiliarData.map(fruit => {
          if (fruit.id === selectedFruit.id){
            fruit.valueA = responseData.valueA;
            fruit.valueB = responseData.valueB;
            fruit.result = responseData.result;
          }
        });
        openCloseModalMultiply();
      }).catch((error) => {
        console.log(error);
      });
  }

  const divideRequest = async() => {    
    await axios
    .put(baseURL+"/"+selectedFruit.id+"/divide",selectedFruit)
      .then((response) => {
        var responseData = response.data;
        var auxiliarData = data;
        auxiliarData.map(fruit => {
          if (fruit.id === selectedFruit.id){
            fruit.valueA = responseData.valueA;
            fruit.valueB = responseData.valueB;
          }
        });
        openCloseModalDivide();
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRequest();
  })

  return (
    <div className="fruit-container">
       <br />
       <h3>Fruit Market</h3>
       <header>
        <img src={appLogo} alt="Logo" style={{ width: "30%", height: "30%" }} />
        <button className="btn btn-success" onClick={() => openCloseModalInclude()}>Add new fruit</button>
       </header>
       <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>A</th>
            <th>B</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(fruit => (
            <tr key = {fruit.Id}>
              <td>{fruit.description}</td>
              <td>{fruit.valueA}</td>
              <td>{fruit.valueB}</td>
              <td>{fruit.result}</td>
              <td>
                <button className="btn btn-primary" onClick={() => selectFruit(fruit, "multiply")}>Multiply</button>
                <button className="btn btn-warning" onClick={() => selectFruit(fruit, "divide")}>Divide</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen = {modalInclude}>
        <ModalHeader>Add new fruit</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Description: </label>
            <br />
            <input type="text" className="form-control" name="description" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => postRequest()}>Save</button>
          <button className="btn btn-danger" onClick={() => openCloseModalInclude()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen = {modalMultiply}>
        <ModalHeader>Multiply fruit</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Description: </label>
            <br />
            <input type="text" className="form-control" name="description"
            value={selectedFruit && selectedFruit.description} onChange={handleChange} />
            <label>Value A: </label>
            <br />
            <input type="int" className="form-control" name="valueA"
            value={selectedFruit && selectedFruit.valueA} onChange={handleChange} />
            <label>Value B: </label>
            <br />
            <input type="int" className="form-control" name="valueB"
            value={selectedFruit && selectedFruit.valueB} onChange={handleChange} />
            <label>Result: </label><br />
            <input type="int" className="form-control" name="result" readOnly 
            value={selectedFruit && selectedFruit.result} /><br />
          </div>
        </ModalBody>
        <ModalFooter> 
          <button className="btn btn-primary" onClick={() => multiplyRequest()}>Save</button>
          <button className="btn btn-danger" onClick={() => openCloseModalMultiply()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen = {modalDivide}>
        <ModalHeader>Divide fruit</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Description: </label>
            <br />
            <input type="text" className="form-control" name="description"
            value={selectedFruit && selectedFruit.description} onChange={handleChange} />
            <label>Value A: </label>
            <br />
            <input type="int" className="form-control" name="valueA"
            value={selectedFruit && selectedFruit.valueA} onChange={handleChange} />
            <label>Value B: </label>
            <br />
            <input type="int" className="form-control" name="valueB"
            value={selectedFruit && selectedFruit.valueB} onChange={handleChange} />
            <label>Result: </label><br />
            <input type="int" className="form-control" name="result" readOnly 
            value={selectedFruit && selectedFruit.result} /><br />
          </div>
        </ModalBody>
        <ModalFooter> 
          <button className="btn btn-primary" onClick={() => divideRequest()}>Save</button>
          <button className="btn btn-danger" onClick={() => openCloseModalDivide()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default App
