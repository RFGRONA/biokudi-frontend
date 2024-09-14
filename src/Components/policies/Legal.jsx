import React from 'react'
import Layout from './Layout'
import Icon from "../../assets/policies/legal.svg";


const Legal = () => {
  return (
    <Layout icon={Icon} title="Legal">
      <p>Este sitio web y su contenido son proporcionados con fines informativos y están sujetos a las siguientes condiciones. Al acceder y utilizar este sitio, usted acepta cumplir con los términos y condiciones aquí establecidos.</p>
      <p>El contenido de este sitio web, incluidos textos, imágenes, logotipos y gráficos, está protegido por derechos de autor y otras leyes de propiedad intelectual. No está permitido copiar, reproducir, distribuir o utilizar el contenido de este sitio sin el consentimiento previo por escrito de los propietarios del mismo, excepto cuando lo permita la ley. Este sitio web puede contener enlaces a sitios web externos que no están bajo nuestro control. No somos responsables del contenido, políticas de privacidad o prácticas de esos sitios. El uso de dichos enlaces es bajo su propio riesgo. </p>
      <p>Nos esforzamos por asegurar que la información proporcionada en este sitio sea precisa y actualizada; sin embargo, no garantizamos la exactitud, integridad o actualidad de la información. Nos reservamos el derecho de modificar, actualizar o eliminar el contenido de este sitio en cualquier momento sin previo aviso.</p>
    </Layout>
  )
}

export default Legal