import { screen } from '@testing-library/react'
const s = screen
import userEvent from '@testing-library/user-event'

let h = {}

let blog
let queries

h.setup = (props) => {
  const { blog } = props

  queries = {
    'title': ['text', blog.title, { exact: false }],
    'link': ['role', 'link', { href: blog.url }],
    'author': ['text', blog.author, { exact: false }],
    'show-details': ['role', 'button', { name: /show/i, exact: false }],

    'likes': ['testid'],
    'username': ['text', blog.user.username, { exact: false }],
    'remove': ['role', 'button', { name: /delete/i, exact: false }],
    'hide-details': ['role', 'button', { name: /hide/i, exact: false }],
  }
}

const getQueryForElement = (element) => {
  if (!queries[element]) {
    throw new Error(`No query set up for element ${element}`)
  }

  const by = queries[element][0]
  const matcher = queries[element][1]

  if (!by) {
    throw new Error('Set up query must have a matcher type')
  }

  if (!matcher && by !== 'testid') {
    throw new Error('This matcher type queries must have a matcher')
  }

  const options = queries[element][2]

  return { by, matcher, options }
}

h.get = (element) => {
  const { by, matcher, options } = getQueryForElement(element)

  if (by === 'text') {
    return s.getByText(matcher, options)
  }
  if (by === 'role') {
    return s.getByRole(matcher, options)
  }
  if (by === 'testid') {
    return s.getByTestId(element, options)
  }
  if (by === 'label') {
    return s.getByLabelText(matcher, options)
  }

  throw new Error('Invalid matcher type')
}

h.query = (element) => {
  const { by, matcher, options } = getQueryForElement(element)

  if (by === 'text') {
    return s.queryByText(matcher, options)
  }
  if (by === 'role') {
    return s.queryByRole(matcher, options)
  }
  if (by === 'testid') {
    return s.queryByTestId(element, options)
  }
  if (by === 'label') {
    return s.queryByLabelText(matcher, options)
  }

  throw new Error('query not defined for this element')
}

h.showDetails = async () => {
  const user = userEvent.setup()
  const showDetails = h.get('show-details')
  await user.click(showDetails)
}

export default h