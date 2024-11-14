// SideBar.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./SideBar.module.css";
import logoIcon from "../../assets/map/logo.svg";
import favoriteIcon1 from "../../assets/map/favorite1.svg";
import favoriteIcon2 from "../../assets/map/favorite2.svg";
import favoriteIcon3 from "../../assets/map/favorite3.svg";
import locationIcon from "../../assets/map/locationIcon.svg";
import linkIcon from "../../assets/map/linkIcon.svg";
import starIcon from "../../assets/map/starIcon.svg";
import { useNavigate } from "react-router-dom";
import ViewMore from "../../assets/map/viewMore.svg";

const Sidebar = ({
  points,
  selectedPlaceId,
  onPlaceSelect,
  showMore,
  isPlaceLoading,
  setIsPlaceLoading,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const itemRefs = useRef({});

  const goToHome = () => {
    navigate("/");
  };

  const toggleFavoriteMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (selectedPlaceId) {
      if (!isMenuOpen) {
        setIsMenuOpen(true);
      }

      if (itemRefs.current[selectedPlaceId]) {
        itemRefs.current[selectedPlaceId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedPlaceId]);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.sidebar}>
        <div className={styles.iconContainer} onClick={goToHome}>
          <img src={logoIcon} alt="Logo" className={styles.icon} />
        </div>
        <hr className={styles.separator} />
        <div className={styles.iconContainer} onClick={toggleFavoriteMenu}>
          <img
            src={isMenuOpen ? favoriteIcon2 : favoriteIcon1}
            alt="Favoritos"
            className={styles.icon}
          />
          <p className={styles.iconText}>Lugares</p>
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.favoriteList}>
            {points.map((point) => (
              <div
                key={point.idPlace}
                ref={(el) => {
                  itemRefs.current[point.idPlace] = el;
                }}
                className={`${styles.menuItem} ${
                  selectedPlaceId === point.idPlace ? styles.selectedItem : ""
                }`}
                onClick={() => onPlaceSelect(point.idPlace)}
              >
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>{point.namePlace}</h3>
                  <div className={styles.ratingContainer}>
                    <img
                      src={starIcon}
                      alt="Star"
                      className={styles.ratingIcon}
                    />
                    <span className={styles.ratingValue}>
                      {point.rating || "N/A"}
                    </span>
                  </div>
                </div>
                <p>{point.description || "Sin descripción disponible."}</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img
                        src={locationIcon}
                        alt="Location"
                        className={styles.icon2}
                      />
                      <p>{point.address || "Dirección no disponible"}</p>
                    </div>
                  </div>
                  <div className={styles.optionsContainer}>
                    <div className={styles.heartContainer}>
                      <img
                        src={favoriteIcon3}
                        alt="Heart"
                        className={styles.iconHeart}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.showMore} onClick={showMore}>
                  <p className={styles.showMoreText}>Ver mas</p>
                  <img
                    src={ViewMore}
                    alt="ViewMore"
                    className={styles.iconViewMore}
                  ></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
