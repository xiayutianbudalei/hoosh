import GoHoosheha from "views/GoHoosheha";
import Home from "views/Home";
import My from "views/My";
import SeeHoosheha from "views/SeeHoosheha";
import Vue from "vue";
import VueRouter from "vue-router";
import { AskQuestionsRouter } from "./askQuestions";
import { MyRouter } from "./my";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "问哈",
      keepAlive: true
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "问哈",
      keepAlive: true
    }
  },

  {
    path: "/seehsh",
    name: "SeeHoosheha",
    component: SeeHoosheha,
    meta: {
      title: "看虎什哈",
      keepAlive: true
    }
  },
  {
    path: "/goHoosheha",
    name: "GoHoosheha",
    component: GoHoosheha,
    meta: {
      title: "去虎什哈",
      keepAlive: true
    }
  },
  {
    path: "/my",
    name: "My",
    component: My,
    meta: {
      title: "我的"
    }
  },
  {
    path: "/seeHooshehaDetail/:id",
    name: "SeeHooshehaDetail",
    component: () => import("@/views/SeeHoosheha/SeeHooshehaDetail"),
    meta: {
      title: "文章详情"
    }
  },
  {
    path: "/labepages",
    name: "Labepages",
    component: () => import("@/views/Labepages"),
    meta: {
      title: "标签详情"
    }
  },
  {
    path: "/toAskFriends",
    name: "ToAskFriends",
    component: () => import("@/views/ToAskFriends"),
    meta: {
      title: "以问会友",
      keepAlive: true
    }
  },
  {
    path: "/teamdetails",
    name: "TeamDetails",
    component: () => import("@/views/TeamDetails"),
    meta: {
      title: "小组详情",
      keepAlive: true
    }
  },
  {
    path: "/memberlist",
    name: "MemberList",
    meta: {
      title: "小组成员"
    },
    component: () => import("@/views/TeamDetails/MemberList")
  },
  {
    path: "/invitation",
    name: "Invitation",
    meta: {
      title: "邀请成员"
    },
    component: () => import("@/views/TeamDetails/Invitation")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/accessCode",
    name: "AccessCode",
    component: () => import("@/views/AccessCode"),
    meta: {
      title: "查看私有提问"
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search"),
    meta: {
      title: "搜索",
      keepAlive: true
    }
  },
  {
    path: "/activityDetail/:id",
    name: "ActivityDetail",
    component: () => import("views/ActivityDetail"),
    meta: {
      title: "活动详情"
    }
  },
  ...MyRouter,
  ...AskQuestionsRouter
];

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = function(to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    const position = {};

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash;

      // specify offset of the element
      // if (to.hash === "#anchor2") {
      //   position.offset = { y: 100 };
      // }

      // bypass #1number check
      if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
        return position;
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false;
    }

    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0;
        position.y = 0;
      }

      resolve(position);
    });
  }
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
});

export default router;
