export const MyRouter = [
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/My/Profile"),
    meta: {
      title: "个人信息"
    }
  },
  {
    path: "/mypose",
    name: "MyPose",
    component: () => import("@/views/My/MyPose"),
    meta: {
      title: "提问",
      keepAlive: true
    }
  },
  {
    path: "/myanswer",
    name: "MyAnswer",
    component: () => import("@/views/My/MyAnswer"),
    meta: {
      title: "回答"
    }
  },
  {
    path: "/myattention",
    name: "MyAttention",
    component: () => import("@/views/My/MyAttention"),
    meta: {
      title: "我的关注"
    }
  },
  {
    path: "/myteam",
    name: "MyTeam",
    component: () => import("@/views/My/MyTeam"),
    meta: {
      keepAlive: true,
      title: "我的小组"
    }
  },
  {
    path: "/myaskmore",
    name: "MyAskmore",
    component: () => import("@/views/My/MyAskmore"),
    meta: {
      title: "多问一句"
    }
  },
  {
    path: "/mynewsfeed/:id",
    name: "MynewsFeed",
    component: () => import("@/views/My/MynewsFeed"),
    meta: {
      title: "邀请详情"
    }
  },
  {
    path: "/mymessage",
    name: "MyMessage",
    component: () => import("@/views/My/MyMessage"),
    meta: {
      title: "消息",
      keepAlive: false
    }
  },
  {
    path: "/receivedPraise",
    name: "ReceivedPraise",
    component: () => import("@/views/My/ReceivedPraise"),
    meta: {
      title: "收到的赞"
    }
  },
  {
    path: "/dynamicMessage",
    name: "DynamicMessage",
    component: () => import("@/views/My/DynamicMessage"),
    meta: {
      title: "动态消息",

      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/systemInform",
    name: "SystemInform",
    component: () => import("@/views/My/SystemInform"),
    meta: {
      title: "系统通知"
    }
  },
  {
    path: "/ematicnotification",
    name: "EmaticNotification",
    component: () => import("@/views/My/EmaticNotification"),
    meta: {
      title: "系统通知"
    }
  },
  {
    path: "/setting",
    name: "MySetting",
    component: () => import("@/views/My/MySetting"),
    meta: {
      title: "设置"
    }
  },
  {
    path: "/seeHooshehaDetail",
    name: "SeeHooshehaDetail",
    component: () => import("@/views/SeeHoosheha/SeeHooshehaDetail"),
    meta: {
      title: "个人信息"
    }
  }
];
