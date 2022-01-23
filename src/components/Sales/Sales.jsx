import Container from "@mui/material/Container";
import {
  Button,
  FormGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import SalesTable from "../SalesTable";
import pricingTable from "./resources";

const Sales = () => {
  const [saleItem, setSaleItem] = useState(null);
  const [calculatedRows, setCalculatedRows] = useState([]);

  const submit = () => {
    console.log(calculatedRows);
    setCalculatedRows([
      ...calculatedRows,
      { id: 1, item: "Milk", quantity: 1, price: 3.97 },
    ]);
  };

  return (
    <>
      <Typography variant='h3' align='center' margin={2}>
        Grocery Store
      </Typography>
      <Typography variant='h5' margin={2} align='center'>
        Please Introduce the Item and its Quantity
      </Typography>
      <div style={{ marginLeft: "25%", marginBottom: 25 }}>
        <FormGroup style={{ minWidth: 600, marginTop: 10 }}>
          <FormControl>
            <InputLabel id='select-label'>Select Item</InputLabel>
            <Select
              labelId='select-label'
              value={saleItem}
              onChange={(e) => {
                setSaleItem(e.target.value);
              }}
              required
              label='Select item'
              style={{ marginTop: 10, maxWidth: "25%", height: "6vh" }}
            >
              {pricingTable?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.productName}
                </MenuItem>
              ))}
              <MenuItem value></MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </div>
      <Box textAlign=' center'>
        <Button
          variant='contained'
          align='center'
          onClick={submit}
          style={{ width: 100, marginBottom: 25 }}
        >
          Add
        </Button>
      </Box>
      <SalesTable rows={calculatedRows}></SalesTable>
    </>
  );
};

export default Sales;
