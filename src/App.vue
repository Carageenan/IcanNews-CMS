<template>
  <div>
    <navbar @navbarChangeRegis="changePage"></navbar>
    <login
      @changeRegis="changePage"
      @childDoLogin="doLogin"
      @doLoginGoogle="doLoginGoogle"
      v-if="page === 'login'"
    ></login>
    <register
      @childDoRegister="doRegister"
      v-else-if="page === 'register'"
    ></register>
    <div v-else-if="page === 'loggedIn'" id="main" class="d-flex flex-row">
      <sidebar
        @isEditOrAdd="isEditOrAdd"
        @changeDashboard="changeDashboard"
        @childLogout="doLogout"
        v-if="page === 'loggedIn'"
      ></sidebar>
      <dataHome
        :isEditOrAdd="isEditOrAdd"
        :fnChildChangeStatus="changeStatus"
        :childAllDataNews="allDataNews"
        @childShowAllNews="showAllNews"
        @getAllHistory="getAllHistory"
        v-if="inDashboard === 'home'"
      ></dataHome>
      <reusableForm
        @generateFormAddNews="generateFormAddNews"
        :childDataCategory="allDataCategory"
        @childAddNews="doAddNews"
        :editInfo="editInfo"
        @doEdit="doEdit"
        v-else-if="inDashboard === 'createNews'"
      ></reusableForm>
      <listCategory
        @showAllCategory="showAllCategory"
        :childDataCategory="allDataCategory"
        v-else-if="inDashboard === 'categories'"
      ></listCategory>
      <historyList
        :changeFormatDate="changeFormatDate"
        @getAllHistory="getAllHistory"
        v-else-if="inDashboard === 'histories'"
      ></historyList>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import swal from "sweetalert";
import navbarSection from "./components/Navbar.vue";
import loginSection from "./components/Login.vue";
import registerPage from "./components/Register.vue";
import sidebar from "./components/Sidebar.vue";
import dataHome from "./components/ListDataHome.vue";
import reusableForm from "./components/ReusableForm.vue";
import listCategory from "./components/ListCategory.vue";
import historyList from "./components/HistoryList.vue";

const url = "https://ican-news-cms-2-server.herokuapp.com";
export default {
  components: {
    navbar: navbarSection,
    login: loginSection,
    register: registerPage,
    sidebar,
    dataHome,
    reusableForm,
    listCategory,
    historyList,
  },
  data() {
    return {
      page: "login",
      inDashboard: "",
      allDataNews: [],
      allDataCategory: [],
      allDataHistory: [],
      editInfo: {},
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    async doLogin(data) {
      try {
        const address = `${url}/login`;
        const response = await axios.post(address, {
          email: data.loginEmail,
          password: data.loginPassword,
        });
        localStorage.access_token = response.data.access_token;
        localStorage.id = response.data.id;
        localStorage.role = response.data.role;
        localStorage.username = response.data.username;
        swal("Login Successfully!", "", "success");
        this.page = "loggedIn";
        this.inDashboard = "home";
      } catch (err) {
        swal(err.response.data.message, "", "error");
      }
    },
    doLoginGoogle() {
      Vue.googleAuth().directAccess();
      Vue.googleAuth().signIn(
        (googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          axios({
            method: "post",
            url: `${url}/authGoogle`,
            data: {
              idToken,
            },
          })
            .then((response) => {
              localStorage.access_token = response.data.access_token;
              localStorage.id = response.data.id;
              localStorage.role = response.data.role;
              localStorage.username = response.data.username;
              swal("Login Successfully!", "", "success");
              this.page = "loggedIn";
              this.inDashboard = "home";
            })
            .catch((err) => {
              swal(err.response.data.message, "", "error");
            });
        },
        (err) => {
          swal(err, "", "error");
        }
      );
    },
    async doRegister(data) {
      try {
        const address = `${url}/register`;
        const response = await axios.post(address, {
          username: data.registerUsername,
          email: data.registerEmail,
          password: data.registerPassword,
          phoneNumber: data.registerPhoneNumber,
          address: data.registerAddress,
        });
        swal("Account with role Admin Successfully created!", "", "success");
        this.page = "login";
      } catch (err) {
        let errorMsg = err.response.data.message;
        if (Array.isArray(errorMsg)) {
          errorMsg = errorMsg.join(", ");
        }
        swal(errorMsg, "", "warning");
      }
    },
    doLogout() {
      Vue.googleAuth().signOut(
        () => {},
        (err) => {
          swal(err, "", "error");
        }
      );
      localStorage.clear();
      swal("Logout Successfully!", "", "success");
      this.page = "login";
    },
    //sesudah login
    async showAllNews() {
      try {
        const response = await axios.get(`${url}/news`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.allDataNews = response.data.dataNews;
      } catch (err) {
        swal(response.data.message, "", "error");
      }
    },
    changeDashboard(page) {
      this.inDashboard = page;
    },
    async generateFormAddNews() {
      const response = await axios.get(`${url}/category`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      this.allDataCategory = response.data.data;
    },
    async doAddNews(data) {
      try {
        const response = await axios({
          method: "post",
          url: `${url}/news`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            title: data.title,
            content: data.content,
            imgUrl: data.imgUrl,
            CategoryId: data.categoryId,
          },
        });
        swal("Success adding News!", "Great!", "success");
        this.inDashboard = "home";
      } catch (err) {
        let errorMsg = err.response.data.message;
        if (Array.isArray(errorMsg)) {
          errorMsg = errorMsg.join(", ");
        }
        swal(errorMsg, "", "warning");
      }
    },
    async showAllCategory() {
      const response = await axios.get(`${url}/category`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      this.allDataCategory = response.data.data;
    },
    async changeStatus(data) {
      try {
        const response = await axios({
          method: "patch",
          url: `${url}/news/${data.id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            status: data.status,
          },
        });
        swal("Success change status News!", "", "success");
        this.inDashboard = "";
        setTimeout(() => {
          this.inDashboard = "home";
        }, 1);
      } catch (err) {
        swal(response.data.message, "", "error");
      }
    },
    async getAllHistory() {
      try {
        const response = await axios({
          method: "get",
          url: `${url}/history`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.changeFormatDate;
        this.allDataHistory = response.data.data;
      } catch (err) {
        swal(response.data.message, "", "error");
      }
    },
    isEditOrAdd(info) {
      const { type, id } = info;
      if (type === "edit") {
        axios({
          method: "get",
          url: `${url}/news/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then((response) => {
            const data = response.data.dataNews;
            this.inDashboard = "createNews";
            this.editInfo = {
              data: data,
              type: type,
            };
          })
          .catch((err) => {
            swal(err, "", "error");
          });
      } else {
        this.inDashboard = "";
        setTimeout(() => {
          this.inDashboard = "createNews";
        }, 1);
        this.editInfo = {
          type: type,
        };
      }
    },
    async doEdit(data) {
      const response = await axios({
        method: "put",
        url: `${url}/news/${this.editInfo.data.id}`, //gatau kenapa gabisa ambil id dari child, padahal di awal bisa
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: data.title,
          content: data.content,
          imgUrl: data.imgUrl,
          CategoryId: data.CategoryId,
        },
      });
      swal(`Success update news`, "", "success");
      this.inDashboard = "home";
    },
  },
  computed: {
    changeFormatDate() {
      return this.allDataHistory.map((el) => {
        el.createdAt = el.createdAt.split("T")[0];
        return el;
      });
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.page = "loggedIn";
      this.inDashboard = "home";
    }
  },
  name: "App",
};
</script>

<style>
</style>
