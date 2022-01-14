import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

//  const [dataItems, setDataItems] = useState([]);
 const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyProductList=[
    {id : " p001 ",name :" iPhone 13 ", price: 30000, discount: 15000},
    {id : " p002 ",name :" Marshall ", price: 7000, discount: 8000},
    {id : " p003 ",name :" Samsung Galaxy ", price: 15000, discount: 10000},
    {id : " p004 ",name :" Airpods ", price: 4890, discount: 9000},
    {id : " p005 ",name :" Skull Candy ", price: 3890, discount: 7000}, 
  ];

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    } 

    const pid = itemRef.current.value
    const product = dummyProductList.find(e => e.id === pid)
    var newItem = true;

    for(let x in dataItems) {
      if(dataItems[x].pid == pid) {
        dataItems[x].ppu = parseInt(dataItems[x].ppu) + parseInt(ppuRef.current.value);
        dataItems[x].dis = parseInt(dataItems[x].dis) + parseInt(disRef.current.value);
        dataItems[x].qty = parseInt(dataItems[x].qty) + parseInt(qtyRef.current.value);
        newItem = false;
        break;
      }
    }

    if(newItem) {
      var itemObj = {
        pid: pid,
        item: product.name,
        ppu: ppuRef.current.value,
        dis: disRef.current.value,
        qty: qtyRef.current.value,
      };
  
      dataItems.push(itemObj);
    }
    setDataItems([...dataItems]);
    // setDataItems(dataItems)
  };

  const productChange= (e) => {
    const pid=itemRef.current.value;
    const product=dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value= product.price
    disRef.current.value= product.discount
  }
 
  const options =dummyProductList.map(v=> {
    return <option value={v.id} key={v.id}>{v.name}</option>
  })


  return (
    <Container>
      <Row>
      <h1 style={{color: '#000000', textAlign:"center", fontWeight: "bold", fontSize: "45px", fontFamily:"Times New Roman", marginTop:"20px", marginBottom:"40px"}}>IT Company</h1>
        <Col xs={5} style={{backgroundColor:'#D3D3D3', paddingTop: "20px", paddingBottom: "20px"}}>
        <h2 style={{color: '#000000', textAlign:"left", fontSize: "20px", fontFamily:"Times New Roman"}}>Add Items to Quotation Table : </h2>
        <Col xs={7} style={{backgroundColor:'#D3D3D3', textAlign:"left"}}>
          <Form textAlign="center">
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select 
                aria-label="Default select example" 
                ref={itemRef} 
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity"  ref={qtyRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={disRef}/>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
          </Form>

        </Col>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
