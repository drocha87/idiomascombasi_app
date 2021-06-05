<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">New Module</h1>

    <div class="mt-8">
      <form @submit.prevent="$store.dispatch('admin/modules/saveModule', mod)">
        <div class="flex justify-between">
          <Input
            v-model="mod.title"
            class="w-full"
            label="Title"
            type="text"
            required
          />

          <Select v-model="mod.language" class="ml-4" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <Textarea
          v-model="mod.description"
          class="mt-4"
          label="Description"
          required
        />

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Save Module"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Module } from '@/types'

export default Vue.extend({
  data() {
    const mod: Partial<Module> = {}
    return {
      mod,
    }
  },
})
</script>
