import React from 'react'
import noteContext from '../context/notes/noteContext'
import '../About.css'
const About = (props) => {
  const background = {

  }
  return (
    <div className='bod' style={{ color: 'white' }}>
      <div className="container text-center py-2">
        <div className='container1'>
          <h2 className='title'>About iNOTEBOOK</h2>
          <p className='description'>
            Welcome to iNotebook, your digital companion for effortless note-taking and task management. Designed with simplicity and productivity in mind, iNotebook empowers you to organize your thoughts, ideas, and to-dos with ease. Whether you're a busy professional, a creative thinker, or someone who loves staying organized, iNotebook is here to enhance your daily routines.
          </p>
          <p className='creator'>The iNotebook App was built by Bhargab Das in 2023.</p>
        </div>
        
      </div>


    </div>
  )
}

export default About