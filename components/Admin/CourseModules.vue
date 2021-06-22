<template>
  <div class="border p-4 mt-8">
    <TitleSmall>Modules</TitleSmall>
    <div class="p-4">
      <div
        v-for="(mod, index) in mods"
        :key="mod.module_id"
        type="button"
        class="text-sm block"
      >
        <AdminDataItem
          :label="moduleName(mod.module_id)"
          :index="index"
          :visit="`/admin/modules/${mod.module_id}`"
          :released="mod.released"
          @toggle-release="
            $store.dispatch('admin/courses/toggleModuleRelease', mod.module_id)
          "
          @up="moveModule('up', mod.module_id)"
          @down="moveModule('down', mod.module_id)"
          @remove="$store.dispatch('admin/courses/removeModule', mod.module_id)"
        />
        <!-- <div
          class="flex items-center p-2"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-200': index % 2 !== 0,
          }"
        >
          <button
            type="button"
            class="focus:outline-none bg-white rounded-full"
            @click="moveModule('up', mod.module_id)"
          >
            <IconExpandLess></IconExpandLess>
          </button>
          <button
            type="button"
            class="focus:outline-none bg-white rounded-full ml-2"
            @click="moveModule('down', mod.module_id)"
          >
            <IconExpandMore></IconExpandMore>
          </button>
          <div class="ml-6 flex-grow">
            {{ moduleName(mod.module_id) }}
          </div>
          <button
            type="button"
            class="text-xs px-4"
            :class="{
              'text-blue-500': !mod.released,
              'text-yellow-500': mod.released,
            }"
            @click="
              $store.dispatch(
                'admin/courses/toggleModuleRelease',
                mod.module_id
              )
            "
          >
            {{ mod.released ? 'Unrelease' : 'Release' }}
          </button>

          <button
            type="button"
            class="text-xs text-red-500 px-4"
            @click="
              $store.dispatch('admin/courses/removeModule', mod.module_id)
            "
          >
            Remove
          </button>
          <nuxt-link
            type="button"
            class="text-xs text-green-800 px-4"
            :to="`/admin/modules/${mod.module_id}`"
          >
            Visit
          </nuxt-link>
        </div> -->
      </div>

      <div v-if="mods.length === 0" class="text-sm text-center text-gray-600">
        This course actually don't have any modules, you should start adding
        modules to this course.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module } from '@/types'

export default Vue.extend({
  computed: {
    allMods(): Module[] {
      return this.$store.getters['admin/modules/modules']
    },

    course(): Course {
      return this.$store.getters['admin/courses/course']
    },

    mods(): any[] {
      if (this.course.modules) {
        return this.course.modules
      }
      return []
    },
  },

  methods: {
    moduleName(id: string): string {
      const mod = this.allMods.find((lesson: any) => {
        return lesson.id === id
      })
      if (mod) {
        return mod.title
      }
      return 'undefined'
    },

    async moveModule(direction: string, id: string) {
      await this.$store.dispatch('admin/courses/moveModule', { direction, id })
    },
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply focus:outline-none;
}
</style>
