<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Course Creator" />

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex items-end justify-between">
          <Input
            v-model="title"
            class="w-full"
            label="Title"
            hint="The course title should be unique among all your courses."
            type="text"
            required
          />

          <Select v-model="language" class="ml-4" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <div class="flex items-end mt-4">
          <Input v-model="image" class="flex-grow" label="Image" type="text" />
          <Input
            v-model="author"
            class="flex-grow mx-4"
            label="Author"
            type="text"
            required
          />
          <!-- <Input
            v-model="expiresAt"
            class="flex-grow"
            label="Expires At"
            hint="If the course should not expire, leave this field without date"
            type="date"
          /> -->
        </div>

        <Textarea
          v-model="description"
          class="mt-4"
          label="Short Description"
          maxlength="200"
          :hint="descriptionHint"
          required
        />

        <div class="flex items-center mt-4 bg-gray-100 p-2">
          <div>This course emits certificate</div>
          <input
            type="checkbox"
            class="w-4 h-4 ml-8"
            :checked="certificate"
            @click="certificate = !certificate"
          />
        </div>

        <Select v-model="kind" class="mt-4" label="The course classes will be">
          <option value="recorded">Recorded</option>
          <option value="live">Live</option>
          <option value="mixed">Mixed</option>
        </Select>
        <!-- <div class="p-4 bg-gray-50 mt-4">
          <div class="text-sm text-gray-500">Description preview</div>
          <div v-dompurify-html="description" class="text-sm mt-2"></div>
        </div>

        <Textarea
          v-model="description"
          class="mt-4"
          label="Description"
          hint="You can use html tags to style the text"
          required
        />

        <Textarea
          v-model="wywl"
          class="mt-4"
          label="What you'll learn"
          hint="You can split your text by paragraphs if you let an empty line between them"
        />

        <Textarea
          v-model="requiriments"
          class="mt-4"
          label="Requirements"
          hint="You can split your text by paragraphs if you let an empty line between them"
        /> -->

        <div class="text-right mt-4">
          <Button type="submit" label="Save Course"> </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  data() {
    return {
      title: '',
      language: 'english',
      image: '',
      author: 'Basilia Santiago',
      description: '',
      certificate: false,
      kind: 'live',
    }
  },

  computed: {
    descriptionHint(): string {
      return `Cannot exceed 200 characters: ${this.description.length}`
    },
  },

  methods: {
    async save() {
      try {
        const data: Partial<Course> = {
          title: this.title,
          language: this.language,
          image: this.image,
          author: this.author,
          short_description: this.description,
          certificate: this.certificate,
          kind: this.kind,
        }
        const { course_id: cid } = await this.$axios.$post('courses/', data)
        this.$router.push({ path: `/admin/courses/${cid}` })
      } catch (error) {
        alert(
          `Error: ${
            error.message ||
            error.response?.data?.message ||
            error.data?.message ||
            error.data?.response?.message
          }`
        )
      }
    },
  },
})
</script>
