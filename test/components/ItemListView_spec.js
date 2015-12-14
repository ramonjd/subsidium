import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
import { expect, assert, spy } from 'chai'
import ItemListView from '../../src/components/ItemListView'

describe('ItemListView', () => {

  const usersMock = [
    {
      _id: 0,
      name : 'tony',
      email : 'tony@tony.com'
    },
    {
      _id: 1,
      name : 'bill',
      email : 'bill@bill.com'
    }
  ]

  let updateUserId
  let deleteUserId
  const actionsMock = {
    deleteUser : (id) => {
      deleteUserId = id
    },
    updateUser : (id) => {
      updateUserId = id
    }
  }

  const component = renderIntoDocument(
    <ItemListView items={ usersMock } deleteItem={actionsMock.deleteUser} updateItem={actionsMock.updateUser} apiPath="users"/>
  )

  it('renders ItemListView into page', () => {
    const listItems = scryRenderedDOMComponentsWithTag(component, 'li')
    expect(listItems.length).to.equal(2)

    const updateUserButtons = scryRenderedDOMComponentsWithClass(component, 'updateItem')
    expect(updateUserButtons.length).to.equal(2)

    const deleteUserButtons = scryRenderedDOMComponentsWithClass(component, 'deleteItem')
    expect(deleteUserButtons.length).to.equal(2)

    const linkItems = scryRenderedDOMComponentsWithTag(component, 'a')
    expect(linkItems.length).to.equal(2)
    expect(linkItems[0].textContent).to.contain('tony')
    expect(linkItems[1].textContent).to.contain('bill')

  })

  // doesn't work for now
  // it('renders apiPath into link', () => {
  //   const linkItems = scryRenderedDOMComponentsWithTag(component, 'a')
  // })

  it('update and delete methods return useId', () => {
      const updateUserButtons = scryRenderedDOMComponentsWithClass(component, 'updateItem')
      Simulate.click(updateUserButtons[0])
      expect(updateUserId).to.equal(0)
      Simulate.click(updateUserButtons[1])
      expect(updateUserId).to.equal(1)

      const deleteUserButtons = scryRenderedDOMComponentsWithClass(component, 'deleteItem')
      Simulate.click(deleteUserButtons[0])
      expect(deleteUserId).to.equal(0)
      Simulate.click(deleteUserButtons[1])
      expect(deleteUserId).to.equal(1)
  })

})
