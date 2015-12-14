import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import Dashboard from '../../src/containers/Dashboard'

describe('Dashboard', () => {



  const childrenMock = () => {
    return (
      <strong></strong>
    )
  }

  const locationMock = {
    pathname : '/'
  }


  const component = renderIntoDocument(
    <Dashboard children={ childrenMock() } location={locationMock}></Dashboard>
  )


  it('renders button ', () => {
    const navItems = scryRenderedDOMComponentsWithTag(component, 'li')
    expect(navItems.length).to.equal(4)
    expect(navItems[0].className).to.contain('active')
  })

})
