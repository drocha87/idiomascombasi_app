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

    <ContainerSlot
      class="mt-8"
      title="Uploaded Resources"
      subtitle="To copy the link address you just need to click in the resource name"
    >
      <div
        v-for="(resource, index) in resources"
        :key="resource.name"
        class="border-b p-1 mb-2 flex justify-between"
      >
        <div
          class="text-sm text-blueaws cursor-pointer"
          @click="
            copyToClipboard(
              `https://idiomascombasi.s3.us-east-2.amazonaws.com/resources/${resource.name}`
            )
          "
        >
          {{ resourceName(resource.name) }}
        </div>
        <div class="flex items-center">
          <div class="text-sm text-blueaws lowercase">
            {{ resource.ext.substring(1) }}
          </div>
          <button
            class="ml-8 text-xs text-red-700 lowercase focus:outline-none"
            @click="removeDocument(resource.name, index)"
          >
            Remove
          </button>
        </div>
        <!-- <div class="text-sm text-blueaws lowercase">
          {{ resource.ext.substring(1) }}
        </div> -->
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
      const resources = await this.$axios.$get('/storage/resources/')
      this.resources = resources
        .filter((resource: any) => resource.name?.length > 0)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.last_modified)
          const dateB = new Date(b.last_modified)
          return dateB.getTime() - dateA.getTime()
        })
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
        await this.$axios.$post('/storage/resources/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        await this.$fetch()
        // this.resources = await this.$axios.$get('/storage/resources/')
        this.file = ''
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      } finally {
        this.loading = false
      }
    },

    async removeDocument(fileName: string, index: number) {
      try {
        if (
          confirm(
            'Are you sure you want to remove this file? This process is ireversible.'
          )
        ) {
          await this.$axios.$delete(`storage/resources/${fileName}`)
          this.resources.splice(index, 1)
        }
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      }
    },

    handleFileUpload() {
      this.file = (this.$refs?.file as any)?.files[0]
    },

    copyToClipboard(content: string) {
      navigator.clipboard.writeText(content)
      this.$store.commit('info/SET_INFO', 'Link copiado para o clipboard')
    },

    resourceName(name: string): string {
      return name.substring(name.indexOf('_') + 1)
    },
  },
})
</script>
