import React from 'react'
import PropTypes from 'prop-types'

import { CHECKABLE_ITEM_LIST } from '../../constants/prop-types'
import { Checkbox } from '../styled'
import ListItem from './ListItem'

function CheckBoxGroup({items, onChange, value, multiple}) {

  const isChecked = (v) => multiple ? value.includes(v) : value === v

  const onClick = (v) => isChecked(v)
    ? onChange(multiple ? value.filter(item => item !== v) : v)
    : onChange(multiple ? [...value, v] : v)

  return (
    <div>
      {
        items.map((item) => (
          <ListItem label={item.label} key={item.value}>
            <Checkbox
              checked={isChecked(item.value)}
              onClick={() => onClick(item.value)}
            />
          </ListItem>
        ))
      }
    </div>
  )
}

CheckBoxGroup.propTypes = {
  items: CHECKABLE_ITEM_LIST.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  multiple: PropTypes.bool,
}

export default CheckBoxGroup

