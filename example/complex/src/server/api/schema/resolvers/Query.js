import { forwardTo } from 'prisma-binding'

export default {
  todoes: forwardTo('binding')
}