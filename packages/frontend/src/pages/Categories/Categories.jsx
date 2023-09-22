import React, { useState } from "react";
import { useLocation} from "react-router-dom";
import styles from "./Categories.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Categories() {
  // const { owner } = useParams();
  const [value, setValue] = useState(0);
  const location = useLocation();

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


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <span className={styles.title}>Categories</span>
      </div>
      <div>
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
          {/* <NavLink to={`/categories/${owner}`} > */}
          <Tab disableRipple label="American" style={location.pathname.includes("American") ? style1 : style} />
          <Tab disableRipple label="Item Two" style={location.pathname.includes("Item One") ? style1 : style} />
          <Tab disableRipple label="Item Three" style={location.pathname.includes("Item One") ? style1 : style} />
          <Tab disableRipple label="Item Four" style={location.pathname.includes("Item One") ? style1 : style} />
          <Tab disableRipple label="Item Five" style={location.pathname.includes("Item One") ? style1 : style} />
          <Tab disableRipple label="Item Six" style={location.pathname.includes("Item One") ? style1 : style} />
          <Tab disableRipple label="Item Seven" style={location.pathname.includes("Item One") ? style1 : style} />
        </Tabs>
      </div>
    </div>
  );
}

export default Categories;
