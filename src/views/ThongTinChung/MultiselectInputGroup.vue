<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { format, startOfDay, subDays } from 'date-fns';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    const props = defineProps({
        index: Number,
        multi: Boolean,
        FilterGroup: Array
    });

    const filterOptions = [
        {
            value: 'create_uid',
            label: 'Created by',
            type: 'text',
            children: [
                { value: 'ilike', label: 'Chứa' },
                { value: 'not ilike', label: 'Không chứa' },
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        },
        {
            value: 'create_date',
            label: 'Created on',
            type: 'date',
            children: [
                { value: 'between', label: 'Trong khoảng' },
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '>', label: 'Là sau' },
                { value: '<', label: 'Là trước' },
                { value: '>=', label: 'Sau hoặc bằng' },
                { value: '<=', label: 'Trước hoặc bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        },
        {
            value: 'id',
            label: 'Id',
            type: 'number',
            children: [
                { value: '=', label: 'Là' },
                { value: '<=', label: 'Nhỏ hơn hoặc bằng' },
                { value: '>', label: 'Lớn hơn' },
            ]
        },
        {
            value: 'write_uid',
            label: 'Last Updated by',
            type: 'text',
            children: [
                { value: 'ilike', label: 'Chứa' },
                { value: 'not ilike', label: 'Không chứa' },
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        },
        {
            value: 'write_date',
            label: 'Last Updated on',
            type: 'date',
            children: [
                { value: 'between', label: 'Trong khoảng' },
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '>', label: 'Là sau' },
                { value: '<', label: 'Là trước' },
                { value: '>=', label: 'Sau hoặc bằng' },
                { value: '<=', label: 'Trước hoặc bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        },
        {
            value: 'start_year',
            label: 'Năm bắt đầu',
            type: 'number',
            children: [
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '>', label: 'Lớn hơn' },
                { value: '<', label: 'Nhỏ hơn' },
                { value: '>=', label: 'Lớn hơn hoặc bằng' },
                { value: '<=', label: 'Nhỏ hơn hoặc bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        },
        {
            value: 'display_name',
            label: 'Năm học',
            type: 'text',
            children: [
                { value: 'ilike', label: 'Chứa' },
                { value: 'not ilike', label: 'Không chứa' },
                { value: '=', label: 'Bằng' },
                { value: '!=', label: 'Không bằng' },
                { value: '!=', label: 'Được thiết lập' },
                { value: '=', label: 'Không được thiết lập' },
            ]
        }
    ];
    const date1 = ref('');
    const date2 = ref('');

    const selectedCategory = ref('create_uid');
    const selectedOption = ref('ilike');
    const inputValue = ref(null);

    const currentCategory = computed(() => {
        return filterOptions.find(category => category.value === selectedCategory.value);
    });

    const currentInputComponent = computed(() => {
        if (currentCategory.value) {
            if (currentCategory.value.type === 'text') return 'text'
            else if (currentCategory.value.type === 'number') return 'number'
            else return 'date'
        }
        return undefined;
    });

    const onCategoryChange = () => {
        let foundItem = filterOptions.find(item => item.value === selectedCategory.value);
        if (foundItem) {
            selectedOption.value = foundItem.children[0].value;
        }
        inputValue.value = null;
    };

    onMounted(() => {
        const currentDate = new Date();
        const threeDaysAgo = subDays(currentDate, 3);
        const endOfDayThreeDaysAgo = new Date(threeDaysAgo.setHours(23, 59, 59, 999));
        date1.value = format(startOfDay(currentDate), 'MM/dd/yyyy HH:mm:ss');
        date2.value = format(endOfDayThreeDaysAgo, 'MM/dd/yyyy HH:mm:ss');
    });

    const emits = defineEmits(['deleteItem']);

    const deleteItem = () => {
        if (props.FilterGroup?.length !== 1) {
            emits('deleteItem', props.index);
        }
    };
</script>

<template>
    <div class="flex items-start gap-1" :class="{'mt-2 pt-2 border-t-2': (multi === true && index !== 0)}">
        <div class="flex flex-col gap-1 w-full">
            <select v-model="selectedCategory" class="w-full border border-gray-300 p-1 rounded focus-visible:border-gray-300 focus:border-gray-300" @change="onCategoryChange">
                <option v-for="(category, index) in filterOptions" :key="category.value" :value="category.value">
                    {{ category.label }}
                </option>
            </select>
            <select v-if="selectedCategory && currentCategory" v-model="selectedOption" class="w-full border border-gray-300 p-1 rounded">
                <option v-for="(option, index) in currentCategory.children" :key="option.value" :value="option.value" :selected="index === 0">
                    {{ option.label }}
                </option>
            </select>
            <input v-if="selectedCategory && currentInputComponent !== 'date'" :type="currentInputComponent" v-model="inputValue" class="w-full border border-gray-300 p-1 rounded"/>
            <div v-else class="flex flex-col gap-1">
                <VueDatePicker v-model="date1" text-input format="dd/MM/yyyy HH:mm:ss"/>
                <VueDatePicker v-model="date2" text-input format="dd/MM/yyyy HH:mm:ss"/>
            </div>
        </div>
        <button type="button" @click="deleteItem" v-show="multi">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"
                 style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                <path
                    d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
        </button>
    </div>
</template>

<style scoped>
select:focus-visible,
input:focus-visible {
    outline: none !important;
}
</style>
