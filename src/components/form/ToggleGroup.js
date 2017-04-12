import React from 'react'
import PropTypes from 'prop-types'

import { CHECKABLE_ITEM_LIST } from '../../constants/prop-types'
import { Toggle } from '../styled'
import ListItem from './ListItem'

function ToggleGroup({items, onChange, value}) {
  return (
    <div>
      {
        items.map((item) => (
          <ListItem label={item.label} key={item.value}>
            <Toggle
              checked={value === item.value}
              onClick={() => onChange(item.value)}
            />
          </ListItem>
        ))
      }
    </div>
  )
}

ToggleGroup.propTypes = {
  items: CHECKABLE_ITEM_LIST.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ToggleGroup

