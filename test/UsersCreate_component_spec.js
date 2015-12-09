import React from 'react'
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import UserCreateEdit from '../src/components/UserCreateEdit'

describe('Users', () => {

  const usersMock = [
    {
      id: 0,
      username : 'tony'
    }
  ]

  const actionsMock = {
    onSubmit : (e) => {

    }
  }

  it('renders UsersView into page', () => {

    const component = renderIntoDocument(
      <UserCreateEdit user={ usersMock[0] } onSubmit={ actionsMock.onSubmit } />
    )
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(2)
    expect(inputItems[0].name).to.equal('username')
    expect(inputItems[2].name).to.equal('email')

  })

})
