import React from 'react';
import Layout from './Layout';
import Icon from "../../assets/policies/privacyPolicy.svg"; 

const PrivacyPolicy = () => {
  return (
    <Layout icon={Icon} title="Política de Privacidad">
      <p>Bienvenido a nuestro sitio web dedicado al ecoturismo en Cundinamarca. La privacidad de nuestros usuarios es de suma importancia para nosotros. Esta Política de Privacidad explica cómo recopilamos, utilizamos, y protegemos la información personal que obtenemos a través de nuestro sitio web.</p>
      <p>Cuando los usuarios se registran en nuestro sitio web, dejan comentarios o reseñas, recopilamos información personal que puede incluir datos de contacto. No vendemos ni compartimos la información personal de nuestros usuarios con terceros no relacionados.</p>
      <p>Implementamos medidas de seguridad adecuadas para proteger la información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
      <p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página </p>
    </Layout>
  );
};

export default PrivacyPolicy;