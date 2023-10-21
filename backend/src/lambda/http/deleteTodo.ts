import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { cors, httpErrorHandler } from 'middy/middlewares'
import * as middy from 'middy'
import { getUserId } from '../utils'
import { deleteTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const userId = getUserId(event)
    await deleteTodo(userId, todoId)

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
