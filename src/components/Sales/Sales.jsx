import { Typography } from "@mui/material";
import React, { useState } from "react";
import SalesTable from "../SalesTable";
const Sales = () => {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [priceApplied, setPriceApplied] = useState(null);
  const [calculations, setCalculations] = useState([]);
  return (
    <>
      <Typography variant='h3' align='center' margin={2}>
        Grocery Store
      </Typography>
      <Typography
        variant='h5'
        margin={2}
        align='center'
        marginTop={5}
        marginBottom={5}
      >
        Please Introduce the Item and its Quantity
      </Typography>
      <SalesTable></SalesTable>
    </>
  );
};

export default Sales;
