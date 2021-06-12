<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Resources</h1>
    <ContainerSlot class="mt-8" title="Upload Resource">
      <form @submit.prevent="submitFiles">
        <input
          id="file"
          ref="file"
          class="flex-grow ml-4 justify-self-end"
          label="Name"
          type="file"
          required
          @change="handleFileUpload()"
        />

        <div v-if="loading" class="flex flex-col items-center justify-center">
          <Spin size="48px" />
          <span class="text-xs text-gray-400">Uploading....</span>
        </div>
        <div class="text-right">
          <Button label="Upload" small> </Button>
        </div>
      </form>
    </ContainerSlot>

    <ContainerSlot class="mt-8" title="Uploaded Resources">
      <div
        v-for="resource in resources"
        :key="resource.name"
        class="border p-1 px-2 mb-2 flex"
      >
        <div class="text-sm text-blueaws flex-grow">{{ resource.Key }}</div>
        <button class="text-sm text-blueaws">Copy Link</button>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      file: '',
      loading: false,
      resources: [],
    }
  },

  async fetch() {
    try {
      this.resources = await this.$adminapi.$get('/resources/')
    } catch (error) {
      this.$store.commit('info/SET_ERROR', error)
    }
  },

  methods: {
    async submitFiles() {
      try {
        const formData = new FormData()
        formData.append('file', this.file)
        this.loading = true
        await this.$adminapi.$post('/resources/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.resources = await this.$adminapi.$get('/resources/')
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      } finally {
        this.loading = false
      }
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
})
</script>
