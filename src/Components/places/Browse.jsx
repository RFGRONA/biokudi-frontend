import React from "react";
import Places from "./Places";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import styles from "./Browse.module.css";
import {
  getPlaceBySearch,
  getPlacesListApi,
} from "../../services/apiModel/PlaceApi";
import { useEffect, useState } from "react";
import Loading from "../helpers/loading/Loading";
import errorIcon from "../../assets/error/error_icon.svg";

const Browse = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm");
  const [loading, setLoading] = useState(true);

  const handleSearch = async (searchTerm) => {
    const results = await getPlaceBySearch(searchTerm);
    if (Array.isArray(results)) {
      setList(results);
    } else {
      setList({ error: "Error buscando lugares" });
    }
  };

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      if (searchTerm) {
        const results = await getPlaceBySearch(searchTerm);
        if (Array.isArray(results)) {
          setList(results);
        } else {
          setList({ error: "Error buscando lugares" });
        }
      } else {
        const list = await getPlacesListApi();
        if (Array.isArray(list)) {
          setList(list);
        } else {
          setList({ error: "Error obteniendo lugares" });
        }
      }
      setLoading(false);
    };
    getList();
  }, [searchTerm]);

  return (
    <>
      <Header />
      <div className="mainContainer">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Places data={list} />
            {Array.isArray(list) && list.length === 0 && (
              <div className={styles.notFoundContainer}>
                <h1 className={styles.notFound}>
                  No hay resultados para tu búsqueda
                  <img src={errorIcon} alt="Error" />
                </h1>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Browse;
