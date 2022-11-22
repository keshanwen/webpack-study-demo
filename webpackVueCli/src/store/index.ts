import { createPinia }  from 'pinia'
import { useUserStore } from './modules/user.ts'

const pinia = createPinia()

export {
    useUserStore
}
export default pinia