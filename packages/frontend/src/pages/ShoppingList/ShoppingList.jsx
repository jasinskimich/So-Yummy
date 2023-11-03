import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShoppingList.module.css";
import Loader from "../../components/Loader/Loader";
import { ReactComponent as Delete } from "../../images/close.svg";
import Notiflix from "notiflix";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function ShoppingList() {
  const { owner } = useParams();
  const [page, setPage] = useState(1);
  const [shoppingList, setShoppingList] = useState([]);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        let response = await fetch(
          `https://so-yummy-1f2e.onrender.com/api/shopping-list/${owner}`,
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
        const totalPages = Math.ceil(
          response.shoppingList.length / itemsPerPage
        );
        const itemsForCurrentPage = response.shoppingList.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );

        setShoppingList(itemsForCurrentPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingList();
  }, [owner, page]);

  const handleDelete = async (index, ingredient) => {
    Notiflix.Notify.init({
      position: "left-bottom",
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `https://so-yummy-1f2e.onrender.com/api/shopping-list/${owner}`,
      data: {
        id: ingredient.id ?? "N/A",
        name: ingredient.name ?? "N/A",
        measurement: ingredient.measurement ?? "N/A",
        amount: ingredient.amount ?? "N/A",
      },
    };

    try {
      await axios(requestOptions);
      Notiflix.Notify.success("Shopping List updated succesfully!");
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
                <div className={styles.imageBox}>
                  <img
                    className={styles.ingredientImage}
                    src={ingredient ? ingredient.thb : ""}
                    alt="ingredientPicture"
                  />
                </div>
                <div className={styles.name}>
                  <span>{ingredient.name}</span>
                </div>
              </div>
              <div className={styles.detailsSecond}>
                <div className={styles.amount}>
                  {ingredient && ingredient.measurement ? (
                    <span>{ingredient.measurement}</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className={styles.checkBox}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(index, ingredient)}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
          <div className={styles.classicContainer}>
            <div className={styles.classicView}></div>
            <span>Shopping list is empty! Please add products.</span>
          </div>
        </>
        )}
      </div>

      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default ShoppingList;
