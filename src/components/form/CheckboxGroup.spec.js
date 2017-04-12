/* eslint-disable max-len */
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import CheckBoxGroup from './CheckboxGroup'
import { Checkbox } from '../styled'

const items = [
  { value: 'a1', label: 'Item A1' },
  { value: 'a2', label: 'Item A2' },
  { value: 'a3', label: 'Item A3' },
]


describe('<CheckBoxGroup /> component', () => {
  it('renders a list of Checkboxes', () => {
    const wrapper = shallow(
      <CheckBoxGroup
        items={items}
        value="a2"
        onChange={() => {}}
      />
    )

    const checkboxes = wrapper.find(Checkbox)

    expect(checkboxes.length).toBe(3)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  describe('multiple values', () => {

    it('set the corresponding items as checked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value={['a2', 'a3']}
          onChange={onChange}
          multiple
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      expect(checkboxes.at(0).prop('checked')).toBe(false)
      expect(checkboxes.at(1).prop('checked')).toBe(true)
      expect(checkboxes.at(2).prop('checked')).toBe(true)
    })

    it('calls onChange with the item value when a Checkbox is clicked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value={['a2']}
          onChange={onChange}
          multiple
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      checkboxes.at(0).simulate('click')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(['a2', 'a1'])
    })

    it('unchecks the clicked value if it was checked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value={['a2', 'a3']}
          onChange={onChange}
          multiple
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      checkboxes.at(1).simulate('click')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(['a3'])
    })

  })

  describe('single value', () => {

    it('set the corresponding item as checked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value="a2"
          onChange={onChange}
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      expect(checkboxes.at(0).prop('checked')).toBe(false)
      expect(checkboxes.at(1).prop('checked')).toBe(true)
      expect(checkboxes.at(2).prop('checked')).toBe(false)
    })

    it('calls onChange with the item value when a Checkbox is clicked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value="a2"
          onChange={onChange}
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      checkboxes.at(0).simulate('click')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('a1')
    })

    it('calls onChange with the checked value if it is clicked', () => {
      const onChange = jest.fn()
      const wrapper = shallow(
        <CheckBoxGroup
          items={items}
          value="a2"
          onChange={onChange}
        />
      )

      const checkboxes = wrapper.find(Checkbox)

      checkboxes.at(1).simulate('click')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('a2')
    })

  })

})
