import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },

    // QuanLyChung
    {
        path: '/general/school_year',
        name: 'NamHoc',
        component: () => import(/* webpackChunkName: "apps-chat" */ '../views/ThongTinChung/qlynamhoc.vue'),
    },
    {
        path: '/general/semester',
        name: 'KyHoc',
        component: () => import(/* webpackChunkName: "apps-mailbox" */ '../views/ThongTinChung/qlykyhoc.vue'),
    },
    {
        path: '/general/student_cohort',
        name: 'Khoa',
        component: () => import(/* webpackChunkName: "apps-todolist" */ '../views/ThongTinChung/qlykhoa.vue'),
    },
    {
        path: '/general/student_class',
        name: 'Lop',
        component: () => import(/* webpackChunkName: "apps-notes" */ '../views/ThongTinChung/qlylop.vue'),
    },

    // QuanLySinhVien
    {
        path: '/student',
        name: 'SinhVien',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/SinhVien/index.vue'),
    },

    // QuanLyVang
    {
        path: '/absorbed/student_absent',
        name: 'VangSinhVien',
        component: () => import(/* webpackChunkName: "components-accordions" */ '../views/Vang/theosinhvien.vue'),
    },
    {
        path: '/absorbed/class_absent',
        name: 'VangLop',
        component: () => import(/* webpackChunkName: "components-modals" */ '../views/Vang/theolop.vue'),
    },

    // QuanLyHocPhi
    {
        path: '/tuition/student_fee',
        name: 'HocPhiSinhVien',
        component: () => import(/* webpackChunkName: "components-cards" */ '../views/HocPhi/theosinhvien.vue'),
    },
    {
        path: '/tuition/class_fee',
        name: 'HocPhiLop',
        component: () => import(/* webpackChunkName: "components-carousel" */ '../views/HocPhi/theolop.vue'),
    },

    {
        path: '/add',
        name: 'add',
        component: () => import('../views/ThongTinChung/customPage.vue'),
        props: (route) => ({ mode: 'add', page: route.path })
    },
    {
        path: '/edit/:name',
        name: 'edit',
        component: () => import('../views/ThongTinChung/customPage.vue'),
        props: (route) => ({ mode: 'edit', name: route.params.id })
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
