<template>
  <div class="block pb-4 mb-4 border-b text-xs font-medium">
    <div v-if="hasUrl">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ label }}</div>
      </div>
      <div v-if="description !== ''" class="font-ember mt-1 text-gray-700">
        {{ description }}
      </div>

      <div v-if="ext && ext === 'mp3'">
        <AudioPlayer
          class="mt-4"
          :source="to"
          type="audio/mpeg"
          @play="click()"
        />
      </div>
      <div v-else-if="ext && ext === 'mp4'">
        <VideoPlayer
          class="mt-4"
          :source="to"
          type="video/mp4"
          @play="click()"
        />
      </div>
      <a
        v-else
        class="flex items-center justify-between text-blueaws"
        v-bind="$attrs"
        :href="to"
        target="'_blank'"
      >
        <div>{{ label }}</div>
        <div class="uppercase">{{ type }}</div>
      </a>
    </div>

    <span v-else v-bind="$attrs">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ label }}</div>
        <div class="uppercase">{{ type }}</div>
      </div>
      <div v-if="description !== ''" class="font-ember mt-1 text-gray-700">
        {{ description }}
      </div>
    </span>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AudioPlayer from '../AudioPlayer.vue'
export default Vue.extend({
  components: { AudioPlayer },
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'url' },
    description: { type: String, default: '' },
    to: { type: String, required: true },
  },

  computed: {
    hasUrl(): boolean {
      return this.to !== undefined && this.to.length > 0
    },

    ext(): string {
      const index = this.to.lastIndexOf('.')
      const result = this.to.substring(index + 1)
      if (result !== this.to) {
        return result
      }
      return ''
    },
  },

  methods: {
    click() {
      this.$emit('click')
    },
  },
})
</script>
