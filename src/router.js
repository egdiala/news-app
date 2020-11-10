import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";

export default [{
        path: "/",
        component: Login,
        name: "login",
        meta: {
            title: "Login |  NewsApp",
        },
    },
    {
        path: "/register",
        component: Register,
        name: "register",
        meta: {
            title: "Register |  NewsApp",
        },
    },
    {
        path: "/news",
        component: Home,
        name: "home",
        meta: {
            title: "NewsApp",
            requiresAuth: true,
        },
    },
];