import PropTypes from 'prop-types'

export const CHECKABLE_ITEM = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.string,
})
export const CHECKABLE_ITEM_LIST = PropTypes.arrayOf(CHECKABLE_ITEM)
