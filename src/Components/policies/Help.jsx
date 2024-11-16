import React from 'react'
import Layout from './Layout'
import Icon from "../../assets/policies/help.svg"; 
import HelpForm from './HelpForm';

const Help = () => {
  return (
    <Layout icon={Icon} title="Ayuda">
      <HelpForm></HelpForm>
    </Layout>
  )
}

export default Help