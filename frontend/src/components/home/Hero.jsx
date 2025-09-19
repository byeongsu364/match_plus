import React from 'react'
import heroServices from '../../utils/hero'  // 경로는 상황에 맞게 조정
import './styles/Hero.scss'

const Hero = () => {
  return (
    <div className="hero-root">
      <div className="hero-cards">
        {heroServices.map(({ label, icon, onClick }) => (
          <div
            key={label}
            className="hero-card"
            onClick={onClick}
            tabIndex={0}
            role="button"
            onKeyDown={e => { if (e.key === 'Enter') onClick() }}
          >
            <div className="hero-icon">{icon}</div>
            <div className="hero-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
