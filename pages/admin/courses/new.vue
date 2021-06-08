<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">New Course</h1>

    <div class="mt-8">
      <form @submit.prevent="$store.dispatch('admin/courses/save', course)">
        <div class="flex items-end justify-between">
          <Input
            v-model="course.title"
            class="w-full"
            label="Title"
            hint="The course title should be unique among all your courses."
            type="text"
            required
          />

          <Select v-model="course.language" class="ml-4" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <div class="flex items-end mt-4">
          <Input
            v-model="course.image"
            class="flex-grow"
            label="Image"
            type="text"
          />
          <Input
            v-model="course.author"
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
          v-model="course.description"
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
            :checked="course.certificate"
            @click="course.certificate = !course.certificate"
          />
        </div>

        <Select
          v-model="course.kind"
          class="mt-4"
          label="The course classes will be"
        >
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
    const course: Partial<Course> = {
      title: '',
      language: 'english',
      image: '',
      author: 'Basilia Santiago',
      description: '',
      certificate: false,
      kind: 'live',
    }

    return {
      course,
    }
  },

  computed: {
    descriptionHint(): string {
      return `Cannot exceed 200 characters: ${this.course.description?.length}`
    },
  },
})
</script>
