import { createContext } from 'react'

// SEE: https://reactjs.org/docs/context.html#reactcreatecontext
const value = {
  pages: {}
}

export default createContext(value)
