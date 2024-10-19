import React, { useState } from 'react';
import styles from './SideBar.module.css'; 
import logoIcon from '../../assets/map/logo.svg'; 
import favoriteIcon1 from '../../assets/map/favorite1.svg'; 
import favoriteIcon2 from '../../assets/map/favorite2.svg'; 
import locationIcon from '../../assets/map/locationIcon.svg'; 
import linkIcon from '../../assets/map/linkIcon.svg';
import starIcon from '../../assets/map/starIcon.svg';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.iconContainer}>
        <img src={logoIcon} alt="Logo" className={styles.icon} />
        <hr />
      </div>
      <hr className={styles.separator} />
      <div className={styles.iconContainer2}>
        <button className={styles.iconButton} onClick={toggleMenu}>
          <img src={isMenuOpen ? favoriteIcon2 : favoriteIcon1} alt="Favoritos" className={styles.icon} />
          <p className={styles.iconText}>Favoritos</p>
        </button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.favoriteList}>
              <div className={styles.menuItem}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>Title of one place</h3>
                  <div className={styles.ratingContainer}>
                    <img src={starIcon} alt="Star" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>3.5</span>
                  </div>
                </div>
                <p>This is a little description of de place, the idea here is to invite
                  some customers to click below, maybe with something attractive or
                  I don’t know I’m just writing something to test</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img src={locationIcon} alt="Location" className={styles.icon2} />
                      <p>Calle 45a # 14-24, Mosquera</p>
                    </div>
                    <div className={styles.row}>
                      <img src={linkIcon} alt="Link" className={styles.icon2} />
                      <a href="https://www.smartfit.com">www.smartfit.com</a>
                    </div>
                  </div>
                  <div className={styles.heartContainer}>
                    <img src={favoriteIcon2} alt="Heart" className={styles.iconHeart} />
                  </div>
                </div>
              </div>

              <div className={styles.menuItem}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>Title of one place</h3>
                  <div className={styles.ratingContainer}>
                    <img src={starIcon} alt="Star" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>3.5</span>
                  </div>
                </div>
                <p>This is a little description of de place, the idea here is to invite
                  some customers to click below, maybe with something attractive or
                  I don’t know I’m just writing something to test</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img src={locationIcon} alt="Location" className={styles.icon2} />
                      <p>Calle 45a # 14-24, Mosquera</p>
                    </div>
                    <div className={styles.row}>
                      <img src={linkIcon} alt="Link" className={styles.icon2} />
                      <a href="https://www.smartfit.com">www.smartfit.com</a>
                    </div>
                  </div>
                  <div className={styles.heartContainer}>
                    <img src={favoriteIcon2} alt="Heart" className={styles.iconHeart} />
                  </div>
                </div>
              </div>

              <div className={styles.menuItem}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>Title of one place</h3>
                  <div className={styles.ratingContainer}>
                    <img src={starIcon} alt="Star" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>3.5</span>
                  </div>
                </div>
                <p>This is a little description of de place, the idea here is to invite
                  some customers to click below, maybe with something attractive or
                  I don’t know I’m just writing something to test</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img src={locationIcon} alt="Location" className={styles.icon2} />
                      <p>Calle 45a # 14-24, Mosquera</p>
                    </div>
                    <div className={styles.row}>
                      <img src={linkIcon} alt="Link" className={styles.icon2} />
                      <a href="https://www.smartfit.com">www.smartfit.com</a>
                    </div>
                  </div>
                  <div className={styles.heartContainer}>
                    <img src={favoriteIcon2} alt="Heart" className={styles.iconHeart} />
                  </div>
                </div>
              </div>

              <div className={styles.menuItem}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>Title of one place</h3>
                  <div className={styles.ratingContainer}>
                    <img src={starIcon} alt="Star" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>3.5</span>
                  </div>
                </div>
                <p>This is a little description of de place, the idea here is to invite
                  some customers to click below, maybe with something attractive or
                  I don’t know I’m just writing something to test</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img src={locationIcon} alt="Location" className={styles.icon2} />
                      <p>Calle 45a # 14-24, Mosquera</p>
                    </div>
                    <div className={styles.row}>
                      <img src={linkIcon} alt="Link" className={styles.icon2} />
                      <a href="https://www.smartfit.com">www.smartfit.com</a>
                    </div>
                  </div>
                  <div className={styles.heartContainer}>
                    <img src={favoriteIcon2} alt="Heart" className={styles.iconHeart} />
                  </div>
                </div>
              </div>

              <div className={styles.menuItem}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.placeTitle}>Title of one place</h3>
                  <div className={styles.ratingContainer}>
                    <img src={starIcon} alt="Star" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>3.5</span>
                  </div>
                </div>
                <p>This is a little description of de place, the idea here is to invite
                  some customers to click below, maybe with something attractive or
                  I don’t know I’m just writing something to test</p>
                <div className={styles.menuItem2}>
                  <div className={styles.textContainer}>
                    <div className={styles.row}>
                      <img src={locationIcon} alt="Location" className={styles.icon2} />
                      <p>Calle 45a # 14-24, Mosquera</p>
                    </div>
                    <div className={styles.row}>
                      <img src={linkIcon} alt="Link" className={styles.icon2} />
                      <a href="https://www.smartfit.com">www.smartfit.com</a>
                    </div>
                  </div>
                  <div className={styles.heartContainer}>
                    <img src={favoriteIcon2} alt="Heart" className={styles.iconHeart} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;