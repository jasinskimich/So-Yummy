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

  const [value, setValue] = useState(0);
  const location = useLocation();
  const [details, setDetails] = useState(null);
  console.log(details, "DETAILS");
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      const url = "https://yummly2.p.rapidapi.com/categories/list";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const browseCategories = Object.values(result)[0];
        const cusines = browseCategories[8];
        const categories = cusines.display.categoryTopics;
        setCategories(categories);
        if (category !== "american") {
          const index = categories.findIndex(
            (item) => item["tracking-id"] === category
          );
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
      let url =
        "https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0&tag=list.recipe.search_based%3Afq%3Aattribute_s_mv%3A(cuisine%5C%5Ecuisine%5C-";
      if (category === "barbecue") {
        url += "barbecue%5C-bbq)";
      } else {
        url += `${category})`;
      }

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const categoryItems = result.feed;
        setDetails(categoryItems);
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
              to={`/categories/${owner}/${item["tracking-id"]}`}
              key={item.display.displayName}
              disableRipple
              label={item.display.displayName}
              style={
                location.pathname.includes(item["tracking-id"]) ? style1 : style
              }
            />
          ))}
        </Tabs>
      </div>
      <div className={styles.details}>
      {details && details.length > 0 ? (
  details.slice((page - 1) * 8, page * 8).map((item, index) => (
    <NavLink key={index} to={`/recipes/${owner}/${encodeURIComponent(item["tracking-id"])}`}>
      <div className={styles.categoryItem}>
        <img
          src={item.display.images[0]}
          alt={item.display.displayName}
          className={styles.categoryItemPic}
        />
        <div className={styles.categoryItemBox}>
          <span className={styles.categoryItemText}>
            {item.display.displayName}
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
