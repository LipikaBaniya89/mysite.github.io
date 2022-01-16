import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";


import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: {textAlign: 'center'},
  textRight: {textAlign: 'right'},
  textRightWithColor:{textAlign:'right', color:'#FF0000'},
  textRightWhite:{textAlign:'right', color:'#FFFFFF'}
};

function QuotationTable({ data, setDataItems}) {
  const [dataRows, setDataRows] = useState();
  const [totalDiscount, setDiscountPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let discount=0;
    let sumDiscount=0;
    let totalAmount=0;

    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      discount=amount-v.dis;

      if(discount < 0) {
        v.dis=0;
        discount = 0;
        
      }
      
      sumDiscount += parseInt(v.dis);
      totalAmount+=discount;
   
      return (
        <tr key={i}>
          <td className={styles.textCenter}><FaTrash onClick={() => deleteClick(i)}/>
            </td>
          <td style={styles.textRight}>{v.qty}</td>
          <td style={styles.textRight}>{v.item}</td>
          <td style={styles.textRight}>{formatNumber(v.ppu)}</td>
          <td style={styles.textRightWithColor}>{formatNumber(v.dis)}</td>
          <td style={styles.textRight}>{formatNumber(discount)}</td>
         
        </tr>
      );
    });

    setDataRows(z);
    setDiscount(sumDiscount)
    setDiscountPrice(totalAmount)
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
          <h1 style={{color: '#000000', textAlign:"left", fontSize: "25px", fontFamily:"Times New Roman"}}>Quotation Table</h1>
        </Col>
       
      </Row >
      <Table striped bordered hover >
        <thead style={{backgroundColor:"#808080"}}>
          <tr>
          <th style={{width: "20px" }}>&nbsp;</th>
            <th style={styles.textRightWhite}>Qty</th>
            <th style={styles.textRightWhite}>Item</th>
            <th style={styles.textRightWhite}>Price/Unit</th>
            <th style={styles.textRightWithColor}>Discount</th>
            <th style={styles.textRightWhite}>Amount</th>       
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRightWithColor}>{formatNumber(discount)}</th>
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
