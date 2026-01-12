import React from 'react'

const Card = ({children}) => {
  return (
    <div className='overflow-clip bg-linear-135 from-[#f1610122] to-[#23222218] border border-[#E85102] p-3 m-3 mt-6 rounded-[35px] h-60 w-80 mx-6 hover:scale-105 transition-all duration-300'>
        {children}
    </div>
  )
}

export default Card
