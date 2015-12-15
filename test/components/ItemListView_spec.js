import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
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


  const usersMockFilterList = [
    {
      _id: 0,
      name : 'tony',
      email : 'tony@tony.com'
    },
    {
      _id: 1,
      name : 'billw',
      email : 'bill@bill.com'
    },
    {
      _id: 2,
      name : 'bille',
      email : 'bill@bill.com'
    },
    {
      _id: 3,
      name : 'billr',
      email : 'bill@bill.com'
    },
    {
      _id: 4,
      name : 'billt',
      email : 'bill@bill.com'
    },
    {
      _id: 5,
      name : 'billy',
      email : 'bill@bill.com'
    },
    {
      _id: 6,
      name : 'billu',
      email : 'bill@bill.com'
    },
    {
      _id: 7,
      name : 'billi',
      email : 'bill@bill.com'
    },
    {
      _id: 8,
      name : 'billo',
      email : 'bill@bill.com'
    },
    {
      _id: 9,
      name : 'billd',
      email : 'bill@bill.com'
    },
    {
      _id: 11,
      name : 'billd',
      email : 'bill@bill.com'
    }
  ]

  let deleteUserId
  const actionsMock = {
    deleteUser : (id) => {
      deleteUserId = id
    }
  }


  let container = document.createElement('div')
  let component

  afterEach(() => {
    unmountComponentAtNode(container)
  })

  it('renders ItemListView into page', () => {
    component = render(<ItemListView items={ usersMock } deleteItem={actionsMock.deleteUser} apiPath="users"/>, container)
    const listItems = scryRenderedDOMComponentsWithTag(component, 'li')
    const linkItems = scryRenderedDOMComponentsWithTag(component, 'a')
    const deleteUserButtons = scryRenderedDOMComponentsWithClass(component, 'DeleteItemButton')
    expect(listItems.length).to.equal(2)
    expect(linkItems.length).to.equal(2)
    expect(deleteUserButtons.length).to.equal(2)
    expect(linkItems[0].textContent).to.contain('tony')
    expect(linkItems[1].textContent).to.contain('bill')
  })

  // doesn't work for now
  // it('renders apiPath into link', () => {
  //   const linkItems = scryRenderedDOMComponentsWithTag(findRenderedDOMComponentWithTagcomponent, 'a')
  // })


  it('delete button return id of user to delete', () => {
    component = render(<ItemListView items={ usersMock } deleteItem={actionsMock.deleteUser} apiPath="users"/>, container)
    const deleteUserButtons = scryRenderedDOMComponentsWithClass(component, 'DeleteItemButton')
    Simulate.click(deleteUserButtons[0])
    assert.deepEqual(deleteUserId, 0)
  })


  it('should show filter when user count is greater than 10', () => {
    component = render(<ItemListView items={ usersMockFilterList } deleteItem={actionsMock.deleteUser} apiPath="users"/>, container)
    const FilterItems = scryRenderedDOMComponentsWithClass(component, 'FilterItems')
    expect(FilterItems.length).to.equal(1)
  })

  it('should filter list', () => {
    component = render(<ItemListView items={ usersMockFilterList } deleteItem={actionsMock.deleteUser} apiPath="users"/>, container)
    const FilterItemsInput = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(FilterItemsInput.length).to.equal(1)
    FilterItemsInput[0].value = 'ton'
    Simulate.change(FilterItemsInput[0])
    let filteredListItems = scryRenderedDOMComponentsWithTag(component, 'li')
    expect(filteredListItems.length).to.equal(1)
  })

})
