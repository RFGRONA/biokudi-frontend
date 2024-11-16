import Header from "../header/Header1";
import Footer from "../footer/Footer";
import styles from "./HomePage.module.css";
// Assets
import homeImage from "../../assets/homeImage.svg";
import HomeBody from "./HomeBody";
import BarSearch from "./BarSearch";
import { useEffect, useState } from "react";
import { fetchImages } from "../../services/getCarrousel";
import Loading from "../helpers/loading/Loading";
import Error from "../error/Error"; // Asegúrate de tener este componente

function HomePage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(0);

  // API call to get images
  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      try {
        const imageData = await fetchImages();
        if (imageData.error) {
          throw new Error(imageData.message || "Error fetching images");
        }
        setImages([...imageData, ...imageData]);
      } catch (error) {
        console.log("Error fetching images", error);
        setErrorMessage(error.message);
        setErrorStatus(error.status || 500); // Puedes ajustar el código de estado según sea necesario
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorCode={errorStatus} errorMessage={errorMessage} />;
  }

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className="mainContainer">
        <div className={styles.bodyUpper}>
          <div className={styles.leftTitleContainer}>
            <img src={homeImage} alt="homeImage" className={styles.homeImage} />
          </div>
          <div className={styles.rightTitleContainer}>
            <h1
              className={[styles.homeTitle, "inter-bold", "color-primary"].join(
                " "
              )}
            >
              <span>Descubre la magia</span>
              <span>natural de Cundinamarca</span>
            </h1>
            <div className={[styles.homeSubtitle, "asul"].join(" ")}>
              <p>¿Qué destino deseas explorar?</p>
            </div>
            <BarSearch />
          </div>
        </div>
        <HomeBody images={images} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
