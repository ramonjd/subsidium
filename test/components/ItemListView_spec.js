import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils'
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
    deleteUsers : (ids) => {
      deleteUserIds = ids
    }
  }

  const component = renderIntoDocument(
    <ItemListView items={ usersMock } deleteItems={actionsMock.deleteUsers} apiPath="users"/>
  )

  it('renders ItemListView into page', () => {
    const listItems = scryRenderedDOMComponentsWithTag(component, 'li')
    const itemCheckboxes = scryRenderedDOMComponentsWithTag(component, 'input')
    const linkItems = scryRenderedDOMComponentsWithTag(component, 'a')
    expect(listItems.length).to.equal(2)
    expect(itemCheckboxes.length).to.equal(2)
    expect(linkItems.length).to.equal(2)
    expect(linkItems[0].textContent).to.contain('tony')
    expect(linkItems[1].textContent).to.contain('bill')
  })

  // doesn't work for now
  // it('renders apiPath into link', () => {
  //   const linkItems = scryRenderedDOMComponentsWithTag(component, 'a')
  // })

  it('shows and hides delete button when input checkbox is clicked', () => {
      const itemCheckboxes = scryRenderedDOMComponentsWithTag(component, 'input')
      let deleteUserButtons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(deleteUserButtons.length).to.equal(0)
      itemCheckboxes[0].checked = true
      Simulate.change(itemCheckboxes[0])
      deleteUserButtons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(deleteUserButtons.length).to.equal(1)
      itemCheckboxes[0].checked = false
      Simulate.change(itemCheckboxes[0])
      Simulate.change(itemCheckboxes[0])
      deleteUserButtons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(deleteUserButtons.length).to.equal(0)
  })

  it('delete methods return array of userIds to delete', () => {
      const itemCheckboxes = scryRenderedDOMComponentsWithTag(component, 'input')
      itemCheckboxes[0].checked = true
      itemCheckboxes[1].checked = true
      Simulate.change(itemCheckboxes[0])
      Simulate.change(itemCheckboxes[1])
      const deleteUserButtons = scryRenderedDOMComponentsWithTag(component, 'button')
      Simulate.click(deleteUserButtons[0])
      assert.deepEqual(deleteUserIds, [0, 1])
  })

})
