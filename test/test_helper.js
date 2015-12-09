import chai from 'chai'
import spies from 'chai-spies'
import jsdom from 'jsdom'


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView


chai.use(spies)

global.document = doc
global.window = win

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})
