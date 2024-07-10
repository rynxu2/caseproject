<script setup lang="ts">
    import { ref } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import MultiselectInputGroup from '@/views/ThongTinChung/MultiselectInputGroup.vue';

    const focus = ref(false);
    const options = ref(['Orange', 'White', 'Purple']);
    const input1 = ref('Orange');
    const input2 = ref('Orange');
    const filterGroups = [1]
    const addFilterGroup = () => {
        filterGroups.push(1);
    }
</script>

<template>
    <div>
        <div class="top">
            <div class="flex">
                <div class="w-1/2 space-y-2 prose max-w-full">
                    <h4>Năm học</h4>
                </div>
                <div class="w-1/2 flex flex-col justify-start gap-1">
                    <form>
                        <div class="search-form-overlay relative border border-white-dark/20 rounded-md h-9 w-full" @click="focus = true" :class="focus && 'input-focused'">
                            <input
                                type="text"
                                placeholder="Search..."
                                class="form-input bg-white h-full placeholder:tracking-wider hidden ltr:pl-12 rtl:pr-12 peer"
                                :class="{ '!block': focus }"
                                @blur="focus = false"
                            />
                            <button
                                type="submit"
                                class="text-dark/70 absolute ltr:right-1 rtl:left-1 inset-y-0 my-auto w-9 h-9 p-0 flex items-center justify-center peer-focus:text-primary"
                                :class="{ 'ltr:!right-auto ltr:left-1 rtl:right-1': focus }"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="mx-auto">
                                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5"
                                            opacity="0.5"></circle>
                                    <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                    <div class="relative inline-flex justify-end align-middle items-start gap-0.5">
                        <div class="dropdown">
                            <Popper :placement="'bottom-end'" offsetDistance="0" class="align-middle">
                                <a href="javascript:;" class="btn dropdown-toggle bg-[#f2f2f2] rounded shadow-none p-1 hover:bg-[#dbdfeb]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                         style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                        <path
                                            d="M13 20v-4.586L20.414 8c.375-.375.586-.884.586-1.415V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.585c0 .531.211 1.04.586 1.415L11 15.414V22l2-2z"></path>
                                    </svg>
                                    Bộ lọc
                                </a>
                                <template #content="{ close }">
                                    <div class="filter-box px-4 py-2 bg-white">
                                        <div class="filter-content">
                                            <MultiselectInputGroup
                                                v-for="(group, index) in filterGroups"
                                                :key="index"
                                            />
                                        </div>
                                        <div class="relative inline-flex align-middle mt-3 gap-1">
                                            <button type="button" class="btn bg-[#fc6f28] rounded whitespace-nowrap shadow-none text-white hover:bg-[#e3600c]">Áp dụng</button>
                                            <button type="button" class="btn rounded shadow-none hover:bg-[#f2f3f7] whitespace-nowrap" @click="addFilterGroup">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                     viewBox="0 0 24 24"
                                                     style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
                                                </svg>
                                                Thêm điều kiện
                                            </button>
                                        </div>
                                    </div>
                                </template>
                            </Popper>
                        </div>
                        <div class="dropdown">
                            <Popper :placement="'bottom-end'" offsetDistance="0" class="align-middle">
                                <a href="javascript:;" class="btn dropdown-toggle bg-[#f2f2f2] rounded shadow-none p-1 hover:bg-[#dbdfeb]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                         style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                        <path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path>
                                    </svg>
                                    Nhóm theo
                                </a>
                                <template #content="{ close }">
                                    <ul @click="close()">
                                        <li>
                                            <a href="javascript:;">Dropdown link</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Dropdown link</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                        <div class="dropdown">
                            <Popper :placement="'bottom-end'" offsetDistance="0" class="align-middle">
                                <a href="javascript:;" class="btn dropdown-toggle bg-[#f2f2f2] rounded shadow-none p-1 hover:bg-[#dbdfeb]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                         style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                        <path
                                            d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                                    </svg>
                                    Yêu thích
                                </a>
                                <template #content="{ close }">
                                    <ul @click="close()">
                                        <li>
                                            <a href="javascript:;">Dropdown link</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">Dropdown link</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
