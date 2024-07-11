<script setup lang="ts">
import ExportTable from '@/views/ThongTinChung/exportTable.vue';
import { useMeta } from '@/composables/use-meta';
import { ref } from 'vue';

useMeta({ title: 'Checkbox Table' });
const search = ref('');
const cols =
    ref([
        { field: 'tenlop', title: 'Tên lớp', isUnique: true, type: 'string', filter: true, search: true, width: "240px", maxWidth: '240px' },
        { field: 'khoa', title: 'Khóa', type: 'number', filter: true, search: true },
    ]) || [];

const rows = ref(
    [
        { tenlop: "CNTT 15 - 01", khoa: 15 },
        { tenlop: "CNTT 15 - 02", khoa: 15 },
        { tenlop: "CNTT 15 - 03", khoa: 15 },
        { tenlop: "CNTT 15 - 04", khoa: 15 },
        { tenlop: "CNTT 15 - 05", khoa: 15 },
        { tenlop: "CNTT 16 - 01", khoa: 16 },
        { tenlop: "CNTT 16 - 02", khoa: 16 },
    ] || []
);
</script>

<template>
    <div>
        <div class="top mb-5">
            <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                <li>
                    <router-link to="/" class="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             class="h-4 w-4 shrink-0">
                            <path opacity="0.5"
                                  d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                  stroke="currentColor" stroke-width="1.5"></path>
                            <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                                  stroke-linecap="round"></path>
                        </svg>
                    </router-link>
                </li>
                <li class="before:content-['/'] before:px-1.5"><span>Quản lý thông tin chung</span></li>
                <li class="flex before:content-['/'] before:px-1.5"><p class="text-black text-2xl">Lớp</p></li>
            </ol>
        </div>

        <div class="content">
            <exportTable
                :cols="cols"
                :rows="rows"
                :page="'lop'"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
