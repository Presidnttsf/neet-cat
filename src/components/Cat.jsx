import React from 'react'

export const Cat = ({ setActiveTab }) => {
  const handleLogOut = () => {
    setActiveTab("")
  }

  return (
    <div>
      <h1>

        Cat
      </h1 >
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
} 
