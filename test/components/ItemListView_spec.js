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

  let deleteUserIds
  const actionsMock = {
    deleteUserd : (ids) => {
      deleteUserIds = ids
    }
  }

  const component = renderIntoDocument(
    <ItemListView items={ usersMock } deleteItemd={actionsMock.deleteUserd} apiPath="users"/>
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

  it('delete methods return array of userIds to delete', () => {
      const deleteUserButtons = scryRenderedDOMComponentsWithClass(component, 'deleteItem')
      // check checkboxes then click dlete
      Simulate.click(deleteUserButtons[0])
      expect(deleteUserId).to.equal([0])
      Simulate.click(deleteUserButtons[1])
      expect(deleteUserId).to.equal(1)
  })

})
