import React from 'react'

const About = () => {
  return (
    <div className='h-[100vh] w-full bg-gray-900 flex items-start justify-center flex-col p-[10vw]'>
      <div className='h-[100px] w-[100px] rounded-[100%] bg-white flex text-5xl font-bold justify-center items-center text-[#4a7cfa]'>
          AD
      </div>
      <p className='flex items-start mt-[10vh] text-white'>
        It is an Open Source tool made my Achirshman Deb. If you find bugs please comment on the github respiratory. <br />
        Hope you like this simple app.
      </p>
      <div className='text-white mt-11'>
          contact: achirshman@gmail.com
      </div>
    </div>
  )
}

export default About