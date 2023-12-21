import { createStore } from 'vuex'
import $ from 'jquery'
import jwt_decode from 'jwt-decode'

export default createStore({
  state: {
    user: {
      id: "",
      name: "",
      role: "",
      Eid: "",
      tel: "",
      resume: "",
      email: "",
      access: "",
      refresh: "",
      isLogin: "",
    }, 
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {
      state.user.name = user.name;
      state.user.role = user.role;
      state.user.Eid = user.Eid;
      state.user.tel = user.tel;
      state.user.resume = user.resume;
      state.user.email = user.email;
    }
  },
  actions: {
    //context传api, data传信息
    login(context, data) {
      $.ajax({
        url: "",
        type: "POST",
        data: {
          Eid: data.Eid,
          password: data.password,
        },
        success(resp) {
          const { access, refresh } = resp.data;
          const access_obj = jwt_decode(access);
          //获取refresh
          // setInterval(() => {
          //   $.ajax({
          //     url: "",
          //     type: 
          //   })
          // }, 1000);

          //获取用户自己的信息
          $.ajax({
            url: "",
            type: "GET",
            data: {
              id: access_obj.id,
            },
            headers: {
              'Authorization': "Bearer " + access,
            },
            success(resp) {
              context.commit("updateUser", {
                ...resp,
                access: access,
                refresh: refresh,
                isLogin: true, 
              });
              data.success();
            },
          });
        },
        error() {
          data.error();
        }
      }); 
    },
  },
  modules: {
  }
})
