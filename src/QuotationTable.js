import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";


import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: {textAlign: 'center'},
  textRight: {textAlign: 'right'},
};

function QuotationTable({ data, setDataItems}) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setDiscountPrice] = useState(0);
  // const [updateRows, setUpdateRows] = useState(0);

  useEffect(() => {
    let sum=0;
    let discount=0;
    let totalDiscount=0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      sum+=amount;
      discount=amount-v.dis;
      totalDiscount+=discount
      return (
        <tr key={i}>
          <td className={styles.textCenter}>
            <FaTrash onClick={() => deleteClick(i)}/>
            </td>
          <td style={styles.textRight}>{v.qty}</td>
          <td style={styles.textRight}>{v.item}</td>
          <td style={styles.textRight}>{formatNumber(v.ppu)}</td>
          <td style={styles.textRight}>{formatNumber(v.dis)}</td>
          <td style={styles.textRight}>{formatNumber(amount)}</td>
          <td style={styles.textRight}>{formatNumber(discount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(sum);
    setDiscountPrice(totalDiscount)
  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  }; 

  // const pid = itemRef.current.value
  // const product = dummyProductList.find(e => e.id === pid)

  // const checkRedundant = (clickedItem) => {
  //   if (qty.current.value==product.qty)

  // }

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{color: '#000000', textAlign:"left", fontSize: "20px", fontFamily:"Times New Roman"}}>Quotation</h1>
        </Col>
       
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th style={{ width: "20px" }}>&nbsp;</th>
            <th>Qty</th>
            <th style={styles.textCenter}>Item</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Before Discount</th> 
            <th>After Discount</th>       
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{formatNumber(totalPrice)}</th>
            <th style={styles.textRight}>{formatNumber(totalDiscount)}</th>
          </tr>
        </tfoot>
      </Table>

      <Col style={styles.textLeft}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
    </Container>
  );
}

export default QuotationTable;
