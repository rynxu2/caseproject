<template>
    <div>
        <div class="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            <div class="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                <icon-bell />
            </div>
            <span class="ltr:mr-3 rtl:ml-3">Documentation: </span>
            <a href="https://www.npmjs.com/package/@bhplugin/vue3-datatable" target="_blank" class="block hover:underline">
                https://www.npmjs.com/package/@bhplugin/vue3-datatable
            </a>
        </div>

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Checkbox</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <input v-model="search" type="text" class="form-input w-auto" placeholder="Search..." />
                </div>
            </div>

            <div class="datatable">
                <vue3-datatable
                    :rows="rows"
                    :columns="cols"
                    :totalRows="rows?.length"
                    :hasCheckbox="true"
                    :sortable="true"
                    sortColumn="name"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                >
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';

    import IconBell from '@/components/icon/icon-bell.vue';

    useMeta({ title: 'Checkbox Table' });
    const store = useAppStore();
    const search = ref('');
    const cols =
        ref([
            { field: 'id', title: 'ID', isUnique: true },
            { field: 'firstName', title: 'First Name' },
            { field: 'lastName', title: 'Last Name' },
            { field: 'email', title: 'Email' },
            { field: 'phone', title: 'Phone' },
        ]) || [];

    const rows = ref(
        [
            {
                id: 1,
                firstName: 'Caroline',
                lastName: 'Jensen',
                email: 'carolinejensen@zidant.com',
                dob: '2004-05-28',
                address: {
                    street: '529 Scholes Street',
                    city: 'Temperanceville',
                    zipcode: 5235,
                    geo: {
                        lat: 23.806115,
                        lng: 164.677197,
                    },
                },
                phone: '+1 (821) 447-3782',
                isActive: true,
                age: 39,
                company: 'POLARAX',
            },
            {
                id: 2,
                firstName: 'Celeste',
                lastName: 'Grant',
                email: 'celestegrant@polarax.com',
                dob: '1989-11-19',
                address: {
                    street: '639 Kimball Street',
                    city: 'Bascom',
                    zipcode: 8907,
                    geo: {
                        lat: 65.954483,
                        lng: 98.906478,
                    },
                },
                phone: '+1 (838) 515-3408',
                isActive: false,
                age: 32,
                company: 'MANGLO',
            },
            {
                id: 3,
                firstName: 'Tillman',
                lastName: 'Forbes',
                email: 'tillmanforbes@manglo.com',
                dob: '2016-09-05',
                address: {
                    street: '240 Vandalia Avenue',
                    city: 'Thynedale',
                    zipcode: 8994,
                    geo: {
                        lat: -34.949388,
                        lng: -82.958111,
                    },
                },
                phone: '+1 (969) 496-2892',
                isActive: false,
                age: 26,
                company: 'APPLIDECK',
            },
            {
                id: 4,
                firstName: 'Daisy',
                lastName: 'Whitley',
                email: 'daisywhitley@applideck.com',
                dob: '1987-03-23',
                address: {
                    street: '350 Pleasant Place',
                    city: 'Idledale',
                    zipcode: 9369,
                    geo: {
                        lat: -54.458809,
                        lng: -127.476556,
                    },
                },
                phone: '+1 (861) 564-2877',
                isActive: true,
                age: 21,
                company: 'VOLAX',
            },
            {
                id: 5,
                firstName: 'Weber',
                lastName: 'Bowman',
                email: 'weberbowman@volax.com',
                dob: '1983-02-24',
                address: {
                    street: '154 Conway Street',
                    city: 'Broadlands',
                    zipcode: 8131,
                    geo: {
                        lat: 54.501351,
                        lng: -167.47138,
                    },
                },
                phone: '+1 (962) 466-3483',
                isActive: false,
                age: 26,
                company: 'ORBAXTER',
            },
        ] || []
    );

    const randomColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };
</script>
