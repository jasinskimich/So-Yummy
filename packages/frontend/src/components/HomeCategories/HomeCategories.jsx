import React, { useState, useEffect } from "react";
import styles from "./HomeCategories.module.css";
import MobileView from "./MobileView";
import TabletView from "./TabletView";
import DesktopView from "./DesktopView";

const HomeCategories = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1367);
  const [isTablet, setTablet] = useState(
    window.innerWidth <= 1080 && window.innerWidth >= 768
  );
  const [isMobile, setMobile] = useState(window.innerWidth <= 767);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1367);
    setTablet(window.innerWidth < 1367 && window.innerWidth >= 768);
    setMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className={styles.mainContainer}>
      {isDesktop && <DesktopView />}
      {isTablet && <TabletView />}
      {isMobile && <MobileView />}
    </div>
  );
};

export default HomeCategories;
