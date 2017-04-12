import styled from 'styled-components'

const color = p => p.success
  ? '0,255,0'
  : p.error ? '255,0,0' : '0,0,0'

const Progress = styled.div`
  position: fixed;
  display: block;
  z-index: 2;
  height: 5px;
  width: ${p => String((p.count / p.total) * 100)}vw;
  transition: all 0.5s ease;

  background-color: rgba(${color},0.5);

  &:before {
    content: '';
    position: fixed;
    display: block;
    width: 100vw;
    height: 5px;
    background-color: rgba(${color},0.1);
  }
`

export default Progress
