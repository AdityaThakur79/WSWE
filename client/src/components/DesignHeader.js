import React from 'react'
const DesignHeader = ({name,bgColor,textColor}) => {
  return (
  
    <div className=" flex items-center w-full">
      <h1 className={`font-semibold text-3xl font-poppins mr-2`}  style={{ color: textColor }}>{name}</h1>
      <span className={`w-[400px] h-1 rounded bg-${bgColor} `}></span>
    </div>

  )
}

export default DesignHeader
