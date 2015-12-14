import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import TaskCreateEdit from '../../src/components/TaskCreateEdit'

describe('Tasks', () => {

  const tasksMock = [
    {
      id: 0,
      name : 'eat',
      description : 'in bed',
      type : -1
    }
  ]

  let formData
  const onSubmit = (task) => {
    formData = task
  }


  const component = renderIntoDocument(
    <TaskCreateEdit title="Edit" task={ tasksMock[0] } onSubmit={ onSubmit } />
  )


  it('renders prop user into form', () => {
    const inputItems = scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputItems.length).to.equal(4)
    expect(inputItems[0].name).to.equal('name')
    expect(inputItems[1].name).to.equal('description')
    expect(inputItems[2].name).to.equal('type')
    expect(inputItems[3].name).to.equal('type')
    expect(inputItems[0].value).to.equal('eat')
    expect(inputItems[1].value).to.equal('in bed')
    expect(inputItems[2].value).to.equal('1')
    expect(inputItems[3].value).to.equal('-1')

  })


  it('passes title prop to UserCreateEdit', () => {
    const submitButtons = scryRenderedDOMComponentsWithTag(component, 'button')
    const form = findRenderedDOMComponentWithTag(component, 'form')
    expect(form.className).to.equal('Edit')

    expect(submitButtons[0].textContent).to.contain('Edit task')

    const legends = scryRenderedDOMComponentsWithTag(component, 'legend')
    expect(legends[0].textContent).to.contain('Edit task')
  })


  it('should submit form values to prop submit function', () => {
    const form = findRenderedDOMComponentWithTag(component, 'form')
    Simulate.submit(form)
    expect(formData.name).to.equal('eat')
    expect(formData.description).to.equal('in bed')
    expect(formData.type).to.equal(-1)
  })

  it('should submit edited task', () => {
    const form = findRenderedDOMComponentWithTag(component, 'form')
    Simulate.submit(form)
    expect(formData.name).to.equal('eat')
    expect(formData.description).to.equal('in bed')
    expect(formData.type).to.equal(-1)
    form.elements.name.value = 'sleep'
    form.elements.description.value = 'outside'
    form.elements.type.value = 1
    Simulate.submit(form)
    expect(formData.name).to.equal('sleep')
    expect(formData.description).to.equal('outside')
    expect(formData.type).to.equal(1)
  })

})
