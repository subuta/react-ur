import { forwardTo } from 'prisma-binding'

export default {
  createTodo: forwardTo('binding')
}