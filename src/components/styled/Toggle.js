import styled from 'styled-components'

// @link: https://goo.gl/SI3Emi
export default styled.div`
  outline: 0;
  display: block;
  position: relative;
  margin: 3px;
  width: 2rem;
  height: 1rem;
  cursor: pointer;
  user-select: none;

  padding: 2px;
  transition: all .2s ease;
  background-color: transparent;
  border: ${p => p.checked ? '4px solid #7FC6A6': '4px solid gray'};

  &:after {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;

    transition: all .2s ease;
    background-color: ${p => p.checked ? '#7FC6A6' : 'gray'};
    left: ${p => p.checked ? '50%' : '0'};
    content: "";
  }

  &:before {
    display: none;
  }
`
