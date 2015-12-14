import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import UserCreateEdit from '../../src/components/UserCreateEdit'

describe('Users', () => {

  const usersMock = [
    {
      id: 0,
      name : 'tony',
      email : 'tony@tony.com'
    }
  ]

  let formData
  const onSubmit = (user) => {
    formData = user
  }


  const component = renderIntoDocument(
    <UserCreateEdit title="Create" user={ usersMock[0] } onSubmit={ onSubmit } />
  )

  it('renders prop user into form', () => {
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(2)
    expect(inputItems[0].name).to.equal('name')
    expect(inputItems[1].name).to.equal('email')
    expect(inputItems[0].value).to.equal('tony')
    expect(inputItems[1].value).to.equal('tony@tony.com')
  })

  it('passes title prop to UserCreateEdit', () => {
    const submitButtons = scryRenderedDOMComponentsWithTag(component, 'button')
    const form = findRenderedDOMComponentWithTag(component, 'form')
    expect(form.className).to.equal('Create')

    expect(submitButtons[0].textContent).to.contain('Create user')

    const legends = scryRenderedDOMComponentsWithTag(component, 'legend')
    expect(legends[0].textContent).to.contain('Create user')
  })

  it('submits form to prop submit function', () => {
    const forms = scryRenderedDOMComponentsWithTag(component, 'form')
    Simulate.submit(forms[0])
    expect(formData.name).to.equal('tony')
    expect(formData.email).to.equal('tony@tony.com')
  })

})
