import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { TodoAccess } from '../dataLayer/todosAcess'
import { createLogger } from '../utils/logger'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

// TODO: Implement businessLogic
const logger = createLogger('TodoAccess')
const attachmentUtils = new AttachmentUtils()
const todoAccess = new TodoAccess()

/**
 * getTodosForUser.
 *
 * @param userId UserId
 * @returns TodoItem[]
 */
export const getTodosForUser = async (userId: string) => {
  return todoAccess.getTodos(userId)
}

/**
 * createTodo.
 *
 * @param newTodo NewTodo
 * @param userId UserId
 * @returns newItem TodoItem
 */
export const createTodo = async (userId: string, todo: CreateTodoRequest) => {
  const todoId = uuid.v4()
  logger.info(`Creating todo ${todoId}`)
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
  return todoAccess.createTodo({
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl,
    ...todo
  })
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
  todo: UpdateTodoRequest
) => {
  return todoAccess.updateTodo(userId, todoId, todo)
}
/**
 * deleteTodo
 *
 * @param todoId TodoId
 * @param userId UserId
 * @returns string
 */

export const deleteTodo = async (userId: string, todoId: string) => {
  return todoAccess.deleteTodo(userId, todoId)
}

