import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert, spy } from 'chai'
import FilterItems from '../../src/components/FilterItems'

describe('FilterItems', () => {

  let formVal
  const handleChangeMock = (val) => {
    formVal = val
  }


  const component = renderIntoDocument(
      <FilterItems handleChange={ handleChangeMock }/>
  )

  it('returns input value and clears list', () => {
    const inputTag = findRenderedDOMComponentWithTag(component, 'input')
    const clearButton = findRenderedDOMComponentWithTag(component, 'button')
    inputTag.value = 'supdawg'
    Simulate.change(inputTag)
    expect(formVal).to.equal('supdawg')
    Simulate.click(clearButton)
    expect(inputTag.value).to.equal('')
    expect(formVal).to.equal('')
  })

})
