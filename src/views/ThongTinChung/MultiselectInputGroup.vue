<script setup lang="ts">
    import { ref } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    const options1 = ['create_uid', 'create_date', 'id', 'write_uid', 'write_date', 'start_year', 'display_name']
    const options2 = ['ilike', '=', '!=', '!=', '=']

    const input1 = ref(null);
    const input2 = ref(null);
</script>

<template>
    <div class="flex flex-col gap-1">
        <multiselect
            v-model="input1"
            :options="options1"
            class="custom-multiselect"
            :searchable="false"
            :preselect-first="true"
            :allow-empty="false"
            selected-label=""
            select-label=""
            deselect-label=""
        ></multiselect>
        <multiselect
            v-model="input2"
            :options="options2"
            class="custom-multiselect"
            :searchable="false"
            :preselect-first="true"
            :allow-empty="false"
            selected-label=""
            select-label=""
            deselect-label=""
        ></multiselect>
        <input type="text" class="form-input" required />
    </div>
</template>

<style scoped>

</style>
