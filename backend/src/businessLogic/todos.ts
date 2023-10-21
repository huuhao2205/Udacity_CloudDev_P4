import { TodoAccess } from '../dataLayer/todosAcess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic
const logger = createLogger('Business Logic CRUD todo')
const todoAccessLayer = new TodoAccess()

/**
 * getTodosForUser.
 *
 * @param userId UserId
 * @returns TodoItem[]
 */
export const getTodosForUser = async (userId: string) => {
  return await todoAccessLayer.getTodos(userId)
}

/**
 * createTodo.
 *
 * @param newTodo NewTodo
 * @param userId UserId
 * @returns newItem TodoItem
 */
export const createTodo = async (
  request: CreateTodoRequest,
  userId: string
) => {
  logger.info('BL: createTodo')

  if (request) {
    logger.info('Adding a new todo')
    const todoId = uuid.v4()
    return await todoAccessLayer.createTodo({
      userId: userId,
      todoId: todoId,
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: null,
      ...request
    })
  } else {
    logger.error('Add failure')
  }
}

/**
 * updateTodo.
 *
 * @param todoId TodoId
 * @param userId UserId
 * @param todoUpdate TodoUpdate
 * @returns
 */
export const updateTodo = async (
  userId: string,
  todoId: string,
  request: UpdateTodoRequest
) => {
  await todoAccessLayer.updateTodo(userId, todoId, request)
}
/**
 * deleteTodo
 *
 * @param todoId TodoId
 * @param userId UserId
 * @returns string
 */

export const deleteTodo = async (userId: string, todoId: string) => {
  await todoAccessLayer.deleteTodo(userId, todoId)
}

/**
 * createAttachmentPresignedUrl
 */

export const createAttachmentPresignedUrl = async (userId, todoId) => {
  const attachmentId = uuid.v4()

  return await todoAccessLayer.createAttachmentPresignedUrl(
    userId,
    todoId,
    attachmentId
  )
}
