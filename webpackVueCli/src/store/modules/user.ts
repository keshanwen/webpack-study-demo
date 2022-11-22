import { defineStore } from 'pinia'
import { UserState, RoleEnum } from '../types/index.ts'

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
       username: 'kebi',
       role: RoleEnum.Admin 
    }),

    actions: {
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial)
        }
    }
})