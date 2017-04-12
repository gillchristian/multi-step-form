import styled from 'styled-components'

const marginCase = (side) => (p) => p[side] ? p[side] : ''

const Margin = styled.div`
  margin-right: ${marginCase('right')};
  margin-left: ${marginCase('left')};
  margin-top: ${marginCase('top')};
  margin-bottom: ${marginCase('bottom')};
`

export default Margin
