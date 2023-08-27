import React from 'react'
import Notes from './Notes'

export const Home = (props) => {
  let {showAlert}=props;

  return (
    <>
      
      <Notes mode={props.mode} showAlert={showAlert}/>
      
    </>
  )
}
