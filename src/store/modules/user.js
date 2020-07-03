import { login } from "@/api/user"
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
    token: getToken()
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
      },
}

const actions = {
    login({ commit },userInfo) {
        const { phone,email } = userInfo;
        return new Promise((resolve,reject)=>{
            login({ phone:phone.trim(),email:email.trim() }).then(response=>{
                const { data } = response
                commit('SET_TOKEN', data)
                setToken(data)
                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}