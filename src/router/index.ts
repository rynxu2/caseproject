import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },

    // QuanLyChung
    {
        path: '/chung/namhoc',
        name: 'NamHoc',
        component: () => import(/* webpackChunkName: "apps-chat" */ '../views/ThongTinChung/qlynamhoc.vue'),
    },
    {
        path: '/chung/kyhoc',
        name: 'KyHoc',
        component: () => import(/* webpackChunkName: "apps-mailbox" */ '../views/ThongTinChung/qlykyhoc.vue'),
    },
    {
        path: '/chung/khoa',
        name: 'Khoa',
        component: () => import(/* webpackChunkName: "apps-todolist" */ '../views/ThongTinChung/qlykhoa.vue'),
    },
    {
        path: '/chung/lop',
        name: 'Lop',
        component: () => import(/* webpackChunkName: "apps-notes" */ '../views/ThongTinChung/qlylop.vue'),
    },

    // QuanLySinhVien
    {
        path: '/sinhvien',
        name: 'SinhVien',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/SinhVien/index.vue'),
    },

    // QuanLyVang
    {
        path: '/vang/sinhvien',
        name: 'VangSinhVien',
        component: () => import(/* webpackChunkName: "components-accordions" */ '../views/Vang/theosinhvien.vue'),
    },
    {
        path: '/vang/lop',
        name: 'VangLop',
        component: () => import(/* webpackChunkName: "components-modals" */ '../views/Vang/theolop.vue'),
    },

    // QuanLyHocPhi
    {
        path: '/hocphi/sinhvien',
        name: 'HocPhiSinhVien',
        component: () => import(/* webpackChunkName: "components-cards" */ '../views/HocPhi/theosinhvien.vue'),
    },
    {
        path: '/hocphi/lop',
        name: 'HocPhiLop',
        component: () => import(/* webpackChunkName: "components-carousel" */ '../views/HocPhi/theolop.vue'),
    },
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
