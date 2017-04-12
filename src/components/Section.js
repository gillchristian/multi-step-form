import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.h2`
  border-bottom: 2px solid gray;
  margin: 10px 10px 20px 0;
  font-size: 1.2rem;
`

const SectionWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
  padding: 25px 0;
  background-color: ${p => p.bg || 'transparent'}
`

const Box = styled.div`
  max-width: 320px;
  width: 90vw;
`

function Section({children, title, bg}) {
  return (
    <SectionWrapper bg={bg}>
      <Box>
        {
          Boolean(title) &&
          <Title>{title}</Title>
        }
        {children}
      </Box>
    </SectionWrapper>
  )
}

Section.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
}


export default Section
