<template>
    <textarea 
        style="white-space: nowrap;"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
</template>

<script>
export default {
    name: "Demo",
    props: {
        modelValue: {}
    }
}
</script>
