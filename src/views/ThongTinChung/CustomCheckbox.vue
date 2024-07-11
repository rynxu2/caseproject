<script lang="ts" setup >
    import { ref } from 'vue';

    const props = {
        isChecked: Boolean,
    };
</script>

<template>
    <input type="checkbox" :checked="props.isChecked" disabled />
</template>
