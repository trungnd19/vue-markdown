<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "../components/FormInput.vue";
import { length, required, validate } from "../validation";
import { NewUser } from "../users";
import { useUsers } from "../stores/users";
import { useModal } from "../composables/modal";

const username = ref('')
const password = ref('')
const usersStore = useUsers()
const modal = useModal()

const usernameStatus = computed(() => {
  return validate(username.value, [required, length({min: 5, max: 10})])
})

const passwordStatus = computed(() => {
  return validate(password.value, [required, length({min: 10, max: 40})])
})

const isInvalid = computed(() => {
    return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

function handleSubmit() {
    if(!isInvalid.value) {
        return;
    }

    const newUser: NewUser = {
        username: username.value,
        password: password.value
    }

    try {
        usersStore.createUser(newUser)
    } catch(e) {
    }
    
    modal.hideModal()
}

</script>
<template>
    <form class="form" @submit.prevent="handleSubmit">
      <FormInput type="text" name="Username" v-model="username" :status="usernameStatus"/>
      <FormInput type="password" name="Password" v-model="password" :status="passwordStatus"/>
      <button class="button" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
.form {
    background: white;
    padding: 30px;
    margin-top: 50px;
}
</style>

