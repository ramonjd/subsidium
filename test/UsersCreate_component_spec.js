import React from 'react/addons'
const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils
import { expect, assert } from 'chai'
import UsersView from '../src/components/UsersCreate'

describe('Users', () => {

  const actionsMock = {
    createUser : (formData) => {

    }
  }

  it('renders UsersView into page', () => {

    const component = renderIntoDocument(
      <UsersCreate createUser={ actionsMock.createUser } />
    )
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(3)
    expect(inputItems[0].name).to.be('username')
    expect(inputItems[1].name).to.be('phone')
    expect(inputItems[2].name).to.be('email')

  })

})
