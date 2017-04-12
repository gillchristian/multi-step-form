import styled from 'styled-components'

const types = {
  success: '#3c763d',
  info: '#31708f',
  warnig: '#8a6d3b',
  danger: '#a94442',
}

export default styled.div`
  color: ${ p => types[p.type || 'info'] }
  font-style: italic;
  font-size: 0.8rem;
  margin: 5px;
`
