import React from 'react'
import Layout from './Layout'
import Icon from "../../assets/policies/contact.svg"; 
import ContactForm from './ContackForm';

const Contact = () => {
  return (
    <Layout icon ={Icon} title="Contacto">
        <ContactForm></ContactForm>
    </Layout>
  )
}

export default Contact