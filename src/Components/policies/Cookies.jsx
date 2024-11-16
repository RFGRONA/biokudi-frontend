import React from 'react'
import Layout from './Layout'
import Icon from "../../assets/policies/cookies.svg"; 


const Cookies = () => {
  return (
    <Layout icon={Icon} title="Cookies">
      <p>Para mejorar su experiencia en nuestro sitio web, utilizamos cookies y tecnologías similares. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Estas cookies permiten que el sitio web recuerde sus preferencias y configuraciones, así como también ayudan a analizar cómo interactúa con el sitio.</p>
      <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Estas cookies permiten que el sitio recuerde sus preferencias y configuraciones, así como también ayudan a analizar cómo interactúa con el sitio. Utilizamos cookies de preferencias para personalizar su experiencia, cookies de rendimiento para mejorar la funcionalidad y el rendimiento del sitio </p>
      <p>Puede gestionar y controlar el uso de cookies a través de la configuración de su navegador. La mayoría de los navegadores permiten bloquear o eliminar cookies, pero tenga en cuenta que esto puede afectar la funcionalidad del sitio web y su experiencia de navegación.</p>
      <p>Nos reservamos el derecho de modificar esta información sobre el uso de cookies en cualquier momento. Cualquier cambio será publicado en esta página </p>
    </Layout>
  )
}

export default Cookies