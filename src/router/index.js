import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/login/index.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/home/index.vue'),
        // 增加子目录,分别是教师信息,学生信息,实验室信息,课程信息,以及修改密码
        children: [{
                path: '/teachers',
                name: 'Teachers',
                component: () =>
                    import ('../components/teachers/teachers.vue')
            },
            {
                path: '/students',
                name: 'Students',
                component: () =>
                    import ('../components/students/students.vue')
            },
            {
                path: '/lab',
                name: 'Lab',
                component: () =>
                    import ('../components/lab/lab.vue')
            },
            {
                path: '/courses',
                name: 'Courses',
                component: () =>
                    import ('../components/courses/courses.vue')
            },
            {
                path: '/passWord',
                name: 'PassWord',
                component: () =>
                    import ('../components/passWord/passWord.vue')

            }
        ]
    },

]

// 路由导航守卫
// router.beforeEach((to, from, next) => {
//     // 如果是login界面
//     if (to.path == '/') {
//         next()
//     } else { // 如果不是login界面
//         const token = window.sessionStorage.getItem('token');

//         if (!token) {
//             next('/login');
//         } else {
//             next();
//         }

//     }
// })

const router = new VueRouter({
    routes
})

export default router