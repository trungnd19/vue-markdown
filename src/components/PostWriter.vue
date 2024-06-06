<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {TimelinePost} from '../posts'

const props = defineProps<{ post: TimelinePost }>()
const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()
const content = ref(props.post.markdown)

onMounted(() => {
    if(!contentEditable.value) {
        throw new Error('contentEditable node not found!')
    }
    // contentEditable only not null onMounted => assign default value in onMounted
    contentEditable.value.innerText = content.value // default value
})

function handleInput() {
    if(!contentEditable.value) {
        throw new Error('contentEditable node not found!')
    }
    content.value = contentEditable.value.innerText
}

</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput">
                {{ content }}
            </div>
        </div>

        <div class="column">
            {{ content }}
        </div>
    </div>
</template>

<style scoped>

</style>
