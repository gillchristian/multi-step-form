import styled from 'styled-components'

export default styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  color: inherit;

  appearance: none;

  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: ${p => p.error ? 'palevioletred' : 'gray'};

  &:focus {
    outline: none;
  }

  &:hover{
    background-color: ${p => p.loading ? 'transparent' : 'gray'};
    cursor: ${p => p.loading ? 'wait' : 'pointer'};
  }
`
