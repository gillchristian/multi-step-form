import styled from 'styled-components'

export default styled.input`
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.error ? 'palevioletred' : 'gray'};
  font-size: 1em;
  color: #333;
  background-color: transparent;

  padding: 10px 10px 10px 0;
  margin: 10px 10px 10px 0;

  appearance: none;

  &:focus {
    border-bottom-color: ${p => p.error ? 'palevioletred' : 'green'};
    outline: none;
  }
`
