import styles from "./DesktopView.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const DesktopView = ({ first, second, third, fourth, categories }) => {
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
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(first[1]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[1].display.images[0] && (
                  <img
                    src={first[1].display.images[0]}
                    alt={first[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(first[2]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[2].display.images[0] && (
                  <img
                    src={first[2].display.images[0]}
                    alt={first[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(first[3]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {first.length > 0 && first[3].display.images[0] && (
                  <img
                    src={first[3].display.images[0]}
                    alt={first[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {first.length > 0 && first[3].display.displayName}
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
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(second[1]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[1].display.images[0] && (
                  <img
                    src={second[1].display.images[0]}
                    alt={second[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(second[2]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[2].display.images[0] && (
                  <img
                    src={second[2].display.images[0]}
                    alt={second[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(second[3]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {second.length > 0 && second[3].display.images[0] && (
                  <img
                    src={second[3].display.images[0]}
                    alt={second[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {second.length > 0 && second[3].display.displayName}
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
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(third[1]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[1].display.images[0] && (
                  <img
                    src={third[1].display.images[0]}
                    alt={third[1].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third[1].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(third[2]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[2].display.images[0] && (
                  <img
                    src={third[2].display.images[0]}
                    alt={third[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[2].display.displayName}
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(third[3]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {third.length > 0 && third[3].display.images[0] && (
                  <img
                    src={third[3].display.images[0]}
                    alt={third[3].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {third.length > 0 && third[3].display.displayName}
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
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(fourth[1]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[1].display.images[0] && (
                  <img
                    src={fourth[1].display.images[0]}
                    alt={fourth[1].display.displayName}
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
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(fourth[2]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[2].display.images[0] && (
                  <img
                    src={fourth[2].display.images[0]}
                    alt={fourth[2].display.displayName}
                    className={styles.categoryItemPic}
                  />
                )}
                <div className={styles.categoryItemBox}>
                  <span className={styles.categoryItemText}>
                    {fourth.length > 0 && fourth[0].display.displayName}r
                  </span>
                </div>
              </div>
            </NavLink>
            <NavLink to={`/recipes/${owner}/${encodeURIComponent(fourth[3]["tracking-id"])}`}>
              <div className={styles.categoryItem}>
                {fourth.length > 0 && fourth[3].display.images[0] && (
                  <img
                    src={fourth[3].display.images[0]}
                    alt={fourth[3].display.displayName}
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

export default DesktopView;
