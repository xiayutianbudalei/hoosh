export const AskQuestionsRouter = [
  {
    path: "/fillQuestion/:id?",
    name: "FillQuestion",
    meta: {
      title: "提出问题"
    },
    component: () =>
      import(
        /* webpackChunkName: "fillQuestion" */ "@/views/AskQuestions/FillQuestion"
      )
  },

  {
    path: "/createAgroup",
    name: "CreateAgroup",
    meta: {
      title: "创建小组"
    },
    component: () => import("@/views/AskQuestions/CreateAgroup")
  },
  {
    path: "/questionsDetail/:id/:share?/:access_token?", //at表示某个用户token
    name: "QuestionsDetail",
    meta: {
      title: "提问详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "questionsDetail" */ "@/views/AskQuestions/QuestionsDetail"
      )
  },

  {
    path: "/oneMoreQuestionDetails/:id",
    name: "OneMoreQuestionDetails",
    meta: {
      title: "多问一句"
    },
    component: () =>
      import(
        /* webpackChunkName: "oneMoreQuestionDetails" */ "@/views/AskQuestions/OneMoreQuestionDetails"
      )
  },
  {
    path: "/answerDetails/:id",
    name: "AnswerDetails",
    meta: {
      title: "回答详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "answerDetails" */ "@/views/AskQuestions/AnswerDetails"
      )
  },
  {
    path: "/allQuestions/:id",
    name: "AllQuestions",
    meta: {
      title: "全部提问"
    },
    component: () =>
      import(
        /* webpackChunkName: "allQuestions" */ "@/views/AskQuestions/AllQuestions"
      )
  },
  {
    path: "/singleOnemore/:id",
    name: "SingleOnemore",
    meta: {
      title: "多问一句"
    },
    component: () =>
      import(
        /* webpackChunkName: "allQuestions" */ "@/views/AskQuestions/SingleOnemore"
      )
  },
  {
    path: "/wxLogin",
    name: "WxLogin",
    meta: {
      title: "微信登录"
    },
    component: () =>
      import(/* webpackChunkName: "allQuestions" */ "@/views/My/WxLogin")
  }
];
