import styled from 'styled-components'

// @link: https://goo.gl/IbWZxR
export default styled.div`
  position: relative;
  cursor: pointer;
  padding: 0;
  width: 1.2rem;
  height: 1.2rem;

  outline: none;
  user-select: none;

  &:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${p => p.checked ? '#f35429' : 'white' };
  }

  &:hover:before {
    background-color: #f35429;
  }

  &:after {
    display: ${p => p.checked ? 'block' : 'none'}
    content: '';
    position: absolute;
    left: 9px;
    top: 13px;
    background-color: white;
    width: 3px;
    height: 3px;
    box-shadow:
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
`
