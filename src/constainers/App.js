import React from 'react'
import BlueBox from '../components/BlueBox'

export default () => (
  <div>
    <BlueBox style={{top: 0}}>First blue component</BlueBox>
    <BlueBox style={{top: 150}}>Second blue component</BlueBox>
    <BlueBox style={{top: 0, left: 200}}>Third blue component</BlueBox>
  </div>
)
