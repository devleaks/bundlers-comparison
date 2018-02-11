import React from 'react'
import Anime from 'react-anime'
import Classes from './index.css'

/**
 *
 * @param props
 * @return {XML}
 */
export default props => {
  return (
    <Anime
      easing="easeOutElastic"
      duration={1000}
      direction="alternate"
      loop={true}
      delay={(el, index) => index * 240}
      translateX='13rem'
      scale={[0.75, 0.9]}
    >
      <div
        style={props.style}
        className={Classes.main}
      >{props.children}</div>
    </Anime>
  )
}
