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

  const query = queries[element]
  const by = query[0]
  const args = query.slice(1)

  if (!by) {
    throw new Error('Set up query must have a matcher type')
  }

  if (!args[0] && by !== 'testid') {
    throw new Error('This matcher type queries must have a matcher')
  }

  return { by, args }
}

h.get = (element) => {
  const { by, args } = getQueryForElement(element)

  if (by === 'text') {
    return s.getByText(...args)
  }
  if (by === 'role') {
    return s.getByRole(...args)
  }
  if (by === 'testid') {
    return s.getByTestId(...(args.length ? args : [element]))
  }
  if (by === 'label') {
    return s.getByLabelText(...args)
  }

  throw new Error('Invalid matcher type')
}

h.query = (element) => {
  const { by, args } = getQueryForElement(element)

  if (by === 'text') {
    return s.queryByText(...args)
  }
  if (by === 'role') {
    return s.queryByRole(...args)
  }
  if (by === 'testid') {
    return s.queryByTestId(...(args.length ? args : [element]))
  }
  if (by === 'label') {
    return s.queryByLabelText(...args)
  }

  throw new Error('query not defined for this element')
}

h.showDetails = async () => {
  const user = userEvent.setup()
  const showDetails = h.get('show-details')
  await user.click(showDetails)
}

export default h