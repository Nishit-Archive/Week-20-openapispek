import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'
const ParamsSchema = z.object({
    id: z
        .string()
        .min(3)
        .openapi({
            param: {
                name: 'id',
                in: 'path',
            },
            example: '1212121',
        }),
})


const UserSchema = z
    .object({
        id: z.string().openapi({
            example: 'here is Stating id',
        }),
        name: z.string().openapi({
            example: 'John Doe',
        }),
        age: z.number().openapi({
            example: 42,
        }),
        email: z.string().email().openapi({
            example: 'abc@gmail.com'
        }),
    })
    .openapi('User');


// creating route from here using open api zod/openai extension

const route = createRoute({
    method: 'get',
    path: '/user/:id',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: UserSchema,
                }
            },
            description: "Retriving User Data using zod/openapi extension"
        },
    },
})


// creating hono app instance

const app = new OpenAPIHono()

// adding route to hono app instance    

app.openapi(route, (c) => {
    const { id } = c.req.valid('param')

    return c.json({
        id,
        name: 'John Doe',
        age: 42,
        email: 'example@gmail.com'
    })
})

// adding openapi doc to hono app instance  
app.doc("/doc", {
    openapi: "3.0.0",
    info: {
        title: "User Api Created by Nishitbaria",
        version: "1.0.0",
    }
})


const app1 = new Hono();


app1.get('/ui', swaggerUI({ url: '/doc' }))

export default app