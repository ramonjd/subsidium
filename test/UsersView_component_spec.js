import React from 'react'
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import UsersView from '../src/components/UsersView'

describe('Users', () => {

  const usersMock = [
    {
      id: 0,
      username : 'tony'
    }
  ]

  const actionsMock = {
    setUsers : () => {}
  }

  it('renders UsersView into page', () => {

    // const component = renderIntoDocument(
    //   <UsersView users={ usersMock } actions={ actionsMock }/>
    // )
    // const listItems = scryRenderedDOMComponentsWithTag(component, 'li')
    // expect(listItems.length).to.equal(1)
    // expect(listItems[0].textContent).to.contain('tony')

  })

})
