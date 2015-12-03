//  https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {expect, assert} from 'chai'
import * as actions from '../src/actions/'
import {types} from '../src/constants/'
import nock from 'nock'

const middlewares = [ thunk ]
