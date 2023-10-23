import React, { useState, useEffect } from "react";
import { useLocation, Link, useParams, NavLink } from "react-router-dom";
import styles from "./Categories.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../../components/Loader/Loader";

function Categories() {
  const { owner } = useParams();
  const { category } = useParams();

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const handleChange = (event, newValue) => {
    setIsLoading(true);
    setValue(newValue);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const style = {
    color: "#22252A",
    fontFamily: `"Poppins", sans-serif`,
    fontWeight: 400,
  };

  const style1 = {
    color: "#8BAA36",
    fontFamily: `"Poppins", sans-serif`,
    fontWeight: 400,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/all-categories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.categories);
        if (category !== "Beef") {
          const index = data.categories.findIndex((item) => item === category);
          setValue(index);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [category]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/api-recipes/${category}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDetails(data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [category]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>Categories</span>
      </div>

      <div className={styles.searchNav}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#8BAA36",
            },
          }}
        >
          {categories.map((item) => (
            <Tab
              component={Link}
              to={`/categories/${owner}/${item}`}
              key={item}
              disableRipple
              label={item}
              style={location.pathname.includes(item) ? style1 : style}
            />
          ))}
        </Tabs>
      </div>
      {isLoading && <Loader />}
      <div className={styles.details}>
        {details && details.length > 0 ? (
          details.slice((page - 1) * 8, page * 8).map((item, index) => (
            <NavLink
              key={index}
              to={`/recipes/${owner}/${item._id}`}
            >
              <div className={styles.categoryItem}>
                <img
                  src={item.preview}
                  alt={item.title}
                  className={styles.categoryItemPic}
                />
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {item.title}
                  </span>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil((details?.length || 0) / 8)}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
}

export default Categories;
