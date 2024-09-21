import React from 'react'
import Layout from './Layout'
import Icon from "../../assets/policies/aboutUs.svg"; 

const AboutUs = () => {
  return (
    <Layout icon={Icon} title="Sobre Nosotros">
      <p>En BioKudi, somos un equipo de estudiantes universitarios comprometidos con ofrecer soluciones innovadoras y de alta calidad. Nuestro objetivo es aplicar nuestros conocimientos y habilidades para crear proyectos que impacten positivamente a nuestras comunidades. Como futuros profesionales, trabajamos en conjunto para enfrentar los desafíos actuales, especialmente en el área de los sistemas, y buscamos generar un cambio significativo a través de la innovación y la colaboración.</p>
      <p>Como estudiantes, entendemos la importancia de aprender y evolucionar constantemente. Por eso, nos dedicamos a crear proyectos que no solo mejoren la vida de las personas, sino que también promuevan el desarrollo sostenible. Nuestro compromiso es con la calidad, la colaboración y el crecimiento, buscando siempre nuevas formas de contribuir al bienestar social y ambiental. </p>
      <p>Agradecemos la confianza depositada en nosotros y continuamos trabajando arduamente</p>
      </Layout>
  )
}

export default AboutUs