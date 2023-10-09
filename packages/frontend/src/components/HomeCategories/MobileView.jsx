import React from "react";
import styles from "./MobileView.module.css";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";


const MobileView = ({ first, second, third, fourth, categories }) => {
  const { owner } = useParams();

  if (categories && first && second && third && fourth) {
    return (
      <>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[0].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(first[0]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[0].display.images[0] && (
                  <img
                    src={first[0].display.images[0]}
                    alt={first[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}

                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
       
            
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[0]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[1].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(second[0]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[0].display.images[0] && (
                  <img
                    src={second[0].display.images[0]}
                    alt={second[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
           
            
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[1]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[2].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(third[0]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[0].display.images[0] && (
                  <img
                    src={third[0].display.images[0]}
                    alt={third[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          
            
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[2]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryHead}>
            <span className={styles.categoryHeadText}>
              {categories.length > 0 && categories[3].display.displayName}
            </span>
          </div>
          <div className={styles.categoryContent}>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(fourth[0]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[0].display.images[0] && (
                  <img
                    src={fourth[0].display.images[0]}
                    alt={fourth[0].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
          
            
          </div>
          <div className={styles.categoryButtonBox}>
            <NavLink
              to={`/categories/${owner}/${categories[3]["tracking-id"]}`}
            >
              <button className={styles.categoryButton}>See all</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Loader />
      </div>
    );
  }
};

export default MobileView;
