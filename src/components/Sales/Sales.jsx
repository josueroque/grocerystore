import {
  Button,
  FormGroup,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SalesTable from "../SalesTable";
import pricingTable from "./resources";

const Sales = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [calculatedRows, setCalculatedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    //Calculate the total
    const totalPrice = calculatedRows
      .map((item) => item.price)
      .reduce(
        (accumulator, value) => parseFloat(accumulator) + parseFloat(value),
        0
      );

    setTotal(totalPrice);

    //Calculate the savings
    let totalSavings = 0;

    calculatedRows.forEach((item) => {
      if (item.unitPrice * item.quantity > item.price)
        totalSavings += item.unitPrice * item.quantity - item.price;
    });
    setSavings(totalSavings.toFixed(2));
  }, [calculatedRows]);

  const submit = () => {
    let itemSelected = calculatedRows.find((item) => item.id === selectedItem);

    if (!itemSelected) {
      itemSelected = pricingTable.find((item) => item.id === selectedItem);

      itemSelected.price = itemSelected.unitPrice;
      itemSelected.quantity = 1;
      setCalculatedRows([...calculatedRows, { ...itemSelected }]);
      return;
    }

    itemSelected.quantity++;

    if (itemSelected.salePrice) {
      if (itemSelected.quantity < itemSelected.salePrice.quantity) {
        itemSelected.price = (
          itemSelected.unitPrice * itemSelected.quantity
        ).toFixed(2);
      } else {
        const groups = Math.floor(
          itemSelected.quantity / itemSelected.salePrice.quantity
        );
        const residue = itemSelected.quantity % itemSelected.salePrice.quantity;

        itemSelected.price = (
          groups * itemSelected.salePrice.price +
          residue * itemSelected.unitPrice
        ).toFixed(2);
      }
    } else
      itemSelected.price = (
        itemSelected.unitPrice * itemSelected.quantity
      ).toFixed(2);

    setCalculatedRows([
      ...calculatedRows.filter((item) => item.id !== itemSelected.id),
      itemSelected,
    ]);
  };

  return (
    <>
      <Typography variant='h3' align='center' margin={2}>
        Grocery Store
      </Typography>
      <Typography variant='h5' margin={2} align='center'>
        Please add the buyed items
      </Typography>
      <div style={{ marginLeft: "25%", marginBottom: 25 }}>
        <FormGroup style={{ minWidth: 600, marginTop: 10 }}>
          <FormControl>
            <InputLabel id='select-label'>Select Item</InputLabel>
            <Select
              labelId='select-label'
              value={selectedItem}
              onChange={(e) => {
                setSelectedItem(e.target.value);
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
      <SalesTable
        rows={calculatedRows}
        total={total}
        savings={savings}
      ></SalesTable>
    </>
  );
};

export default Sales;
