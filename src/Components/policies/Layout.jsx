import React from 'react'
import Header1 from '../header/Header1';
import Footer from '../footer/Footer';
import styles from './Layout.module.css'

const Layout = ({ icon, title, children }) => {
  const addClassToParagraphs = (children) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === 'p') {
        return React.cloneElement(child, { className: styles.layoutPara });
      }
      return child;
    });
  };
  return (
    <div>
      <Header1 />
    <div className={styles.layoutContainer}>
          <main className={styles.layoutBody}>
          <h1>{icon && <img src={icon} alt="Icono" className={styles.icon} />}{title}</h1>
          <hr></hr><br></br>
            {addClassToParagraphs(children)}
          </main>
    </div>
        <Footer />
    </div>
  );
};
export default Layout;
