import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import loginModule from './modules/loginModule';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    LOGIN_USER({commit}, loginData){
      return new Promise((resolve, reject) => {
          axios({
              url: 'http://localhost:8080/api_v1/login',
              data: loginData,
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-type': 'application/json',
              }

            }).then(resp => {
                  const token = resp.data.token;
                  localStorage.setItem('user-token', token);
                  resolve(resp);
                  console.log(resp);

          })
              .catch(err => {
                  localStorage.removeItem('user-token');
                  reject(err);
                  console.log(commit);

              })
      })

    },
    GET_INFO_USER(){
          return new Promise((resolve, reject) => {
              axios({
                  url: 'http://localhost:8080/api_v1/user',
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Content-type': 'application/json',
                  }

              }).then(resp => {
                  resolve(resp);
                  console.log(resp);

              })
                  .catch(err => {
                      reject(err);

                  })
          })
      }
  },
  modules: {
    loginModule
  }
})
