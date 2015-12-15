import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import Users from '../../src/containers/Users'

describe('Users', () => {

  const childrenMock = () => {
    return (
      <strong></strong>
    )
  }

  const usersMock = [
    {
      id: 0,
      name : 'tony',
      email : 'tony@tony.com'
    }
  ]


  const storeMock = {
    getState : ()=> {
      return {
        users : usersMock
      }
    }
  }

  const locationMock = {
    pathname : '/'
  }

  const actionsMock = {
    getUsers : () => {

    },
    createUser : () => {

    },
    deleteUser : () => {

    }
  }


  // const component = renderIntoDocument(
  //   <Users children={ childrenMock() } store={storeMock} location={locationMock} />
  // )


  // it('renders child components', () => {
  //   const FilterItems = scryRenderedDOMComponentsWithClass(component, 'FilterItems')
  //   expect(FilterItems.length).to.equal(1)
  //   const ItemListView = scryRenderedDOMComponentsWithClass(component, 'ItemListView')
  //   expect(ItemListView.length).to.equal(1)
  //   const UserCreateEdit = scryRenderedDOMComponentsWithClass(component, 'UserCreateEdit')
  //   expect(UserCreateEdit.length).to.equal(1)
  // })

})
