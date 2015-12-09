import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert, spy } from 'chai'
import UserCreateEdit from '../src/components/UserCreateEdit'

describe('Users', () => {

  const usersMock = [
    {
      id: 0,
      username : 'tony',
      email : 'tony@tony.com'
    }
  ]

  const onSubmit = (e) => {}

  let submitSpy = spy(onSubmit)

  const component = renderIntoDocument(
    <UserCreateEdit title="Create" user={ usersMock[0] } onSubmit={ submitSpy } />
  )


  it('renders UserCreateEdit inputs into page', () => {
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(2)
    expect(inputItems[0].name).to.equal('username')
    expect(inputItems[1].name).to.equal('email')
    expect(inputItems[0].value).to.equal('tony')
    expect(inputItems[1].value).to.equal('tony@tony.com')
  })


  it('passes props to UserCreateEdit', () => {
    const submitButtons = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(submitButtons[0].textContent).to.contain('Create')

    const legends = scryRenderedDOMComponentsWithTag(component, 'legend')
    expect(legends[0].textContent).to.contain('Create')

    const forms = scryRenderedDOMComponentsWithTag(component, 'form')
    Simulate.submit(forms[0])

    expect(submitSpy).to.have.been.called.once
  })

})
