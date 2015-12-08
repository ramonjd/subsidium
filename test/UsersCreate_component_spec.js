import React from 'react'
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import UserCreate from '../src/components/UserCreate'

describe('Users', () => {

  const usersMock = [
    {
      id: 0,
      username : 'tony'
    }
  ]

  const actionsMock = {
    createUser : (formData) => {

    }
  }

  it('renders UsersView into page', () => {

    const component = renderIntoDocument(
      <UserCreate users={ usersMock } createUser={ actionsMock.createUser } />
    )
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(3)
    expect(inputItems[0].name).to.equal('username')
    expect(inputItems[1].name).to.equal('phone')
    expect(inputItems[2].name).to.equal('email')

  })

})
