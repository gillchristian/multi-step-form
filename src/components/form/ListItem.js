import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Margin, Text } from '../styled'

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
`

function ListItem({children, label}) {
  return (
    <ListItemWrapper>
      <Margin right="10px">
        {children}
      </Margin>
      { Boolean(label) && <Text>{label}</Text> }
    </ListItemWrapper>
  )
}

ListItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
}

export default ListItem
