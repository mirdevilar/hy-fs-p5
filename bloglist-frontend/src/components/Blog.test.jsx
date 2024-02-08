import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
const s = screen
import userEvent from '@testing-library/user-event'
import h from '../utils/Blog_test_helper'

import Blog from './Blog'

let blog = {
  title:	'React patterns',
  author:	'Michael Chan',
  url:	'https://reactpatterns.com/',
  likes:	18,
  user: {
    username: 'alekarhis',
  }
}

h.setup({ blog })

describe('user owns blog', () => {
  const userProp = {
    username: 'alekarhis'
  }

  const element = <Blog blog={blog} user={userProp} />

  beforeEach(() => {
    render(element)
  })

  test('default > render collapsed', () => {
    const title = h.get('title')
    const link = h.get('link')
    const author = h.get('author')
    const showDetails = h.get('show-details')

    const likes = h.query('likes')
    const username = h.query('username')
    const remove = h.query('remove')

    expect(likes).toBeNull()
    expect(username).toBeNull()
    expect(remove).toBeNull()
  })

  test('click show details > render details', async () => {
    const user = userEvent.setup()
    const showDetails = h.get('show-details')
    await user.click(showDetails)

    const likes = h.get('likes')
    expect(likes.innerHTML).toContain(blog.likes.toString())
    const username = h.get('username')
  })

  test('click show details > render delete button', async () => {
    const user = userEvent.setup()
    const showDetails = h.get('show-details')
    await user.click(showDetails)

    const remove = h.get('remove')
  })
})

describe('user does not own blog', () => {
  const userProp = {
    username: 'arnauserra'
  }

  const element = <Blog blog={blog} user={userProp} />

  beforeEach(() => {
    render(element)
  })

  test('click show details > render delete button', async () => {
    await h.showDetails()

    const remove = h.query('remove')
    expect(remove).toBeNull()
  })
})
