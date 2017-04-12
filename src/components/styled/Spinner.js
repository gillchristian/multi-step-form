import styled, { keyframes}  from 'styled-components'

const rotateForever = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export default styled.div`
  animation: ${rotateForever} infinite 1s linear;

  height: 0.75rem;
  width: 0.75rem;
  margin: 0.25rem 1rem;

  border: 5px solid #774CFF;
  border-right-color: transparent;
  border-radius: 50%;

  display: inline-block;
`
