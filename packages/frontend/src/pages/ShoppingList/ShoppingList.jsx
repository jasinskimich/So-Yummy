import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styles from "./ShoppingList.module.css";
import Loader from "../../components/Loader/Loader";
import { ReactComponent as Delete } from "../../images/close.svg";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const axios = require("axios");

function ShoppingList() {
  const { owner } = useParams();
  const [page, setPage] = useState(1);
  const [shoppingList, setShoppingList] = useState([]);
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/shopping-list/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        response = await response.json();

        setShoppingList(response.shoppingList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingList();
  }, [owner]);

  const handleDelete = async (index, ingredient) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:5000/api/shopping-list/${owner}`,
      data: {
        id: ingredient.id ?? "N/A",
        name: ingredient.name ?? "N/A",
        measurement: ingredient.measurement ?? "N/A",
        amount: ingredient.amount ?? "N/A",
      },
    };

    try {
      await axios(requestOptions);
      console.log("Shopping List updated succesfully!");
      setShoppingList((prevList) =>
        prevList.filter((item) => item.id !== ingredient.id)
      );
    } catch (error) {
      console.error("Error updating Shopping List", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>Shopping List</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoHead}>
          <div className={styles.front}>
            <span>Products</span>
          </div>
          <div className={styles.back}>
            <span>Amount</span>
            <span>Remove</span>
          </div>
        </div>

        {shoppingList && shoppingList.length > 0 ? (
          shoppingList.map((ingredient, index) => (
            <div key={index} className={styles.detailsContainer}>
              <div className={styles.detailsFirst}>
                <div className={styles.imageBox}>{index + 1}</div>
                <div className={styles.name}>
                  <span>{ingredient.name}</span>
                </div>
              </div>
              <div className={styles.detailsSecond}>
                <div className={styles.amount}>
                  {ingredient && ingredient.amount && ingredient.measurement ? (
                    <span>
                      {ingredient.amount} {ingredient.measurement}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className={styles.checkBox}>
                  <button onClick={() => handleDelete(index, ingredient)}>
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil((shoppingList?.length || 0) / 4)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default ShoppingList;
