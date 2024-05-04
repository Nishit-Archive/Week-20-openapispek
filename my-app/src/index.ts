import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  console.log('Hello Hono!', c)
  return c.text('Hello Hono!')
})




app.post('/posts', async (c) => {
  const body = await c.req.json();
  console.log('Post created!', body)
  return c.json(
    {
      message: 'User created successfully!',
      data: body,
    },
    200,
    {
      'X-Custom': 'Thank you',
    }
  )
})

export default app
