import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token: localStorage.getItem('user-token') || '',
      loading: false,
      infoMessage: null,
      loginErrors: null,
      user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
      CHANGE_LOGOUT_STATUS(state){
          state.user = null;
          state.token = null;
      },
      SET_INFO_MESSAGE(state, message){
          state.infoMessage = message;
      },
      SET_USER(state, user){
          state.user = user;
      },
      SET_LOADING(state, status){
          state.loading = status;
      },
      SET_ERRORS(state, error){
          state.loginErrors = error;
      }
  },
  actions: {
    LOADING({commit}, status){
      commit('SET_LOADING', status);
    },
    CLEAR_ERROR_MESSAGE({commit}, status){
      commit('SET_ERRORS', status);
    },
    CLEAR_INFO_MESSAGE({commit}, status){
        commit('SET_INFO_MESSAGE', status);
    },
    LOGOUT({commit}){
        commit('CHANGE_LOGOUT_STATUS');
        localStorage.removeItem('user-token');
        localStorage.removeItem('user');
    },
    async SAVE_IMAGE_CHANGES({commit}, imageData){
        try{
           await axios.post('http://localhost:8080/api_v1/user/photo',
                imageData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                    }
                }
            );
        }catch (error) {
            if (error.response) {
                commit('SET_ERRORS', error.response.data);
            }
        }
    },
    async SAVE_CHANGES({commit}, saveData){
        try{
            const response = await axios({
                url: 'http://localhost:8080/api_v1/user',
                data: saveData,
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                }
            });
            await commit('SET_INFO_MESSAGE', response.data.messages);
            router.push('/user');
        }catch (error) {
            if (error.response){
                commit('SET_ERRORS', error.response.data.error);
            }
        }
    },
    async LOGIN_USER({dispatch,commit}, loginData){
        try{
            const response = await axios.post('http://localhost:8080/api_v1/login',
                loginData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                    }
                });
            const token = response.data.token;
            localStorage.setItem('user-token', token);
            commit('SET_ERRORS', null);

        } catch(error){
            dispatch('LOADING', false);
            if (error.response) {
                commit('SET_ERRORS', error.response.data);
            }
            localStorage.removeItem('user-token');
        }
    },
    async GET_INFO_USER({dispatch,commit}, redirect){
        try{
            const response = await axios.get( 'http://localhost:8080/api_v1/user',
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                    }
                },
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            commit('SET_USER', response.data);
            if (redirect){
                router.push('/user');
            }
        }catch (error) {
            console.dir(error);
            dispatch('LOADING', false);
        }

    }
  },
  getters: {
      GET_LOADING(state){
          return state.loading;
      },
      GET_LOGIN_ERRORS(state){
          return state.loginErrors;
      },
      GET_USER(state){
        return state.user;
      },
      GET_INFO_MESSAGE(state){
        return state.infoMessage;
      }
  },
  modules: {}
})
