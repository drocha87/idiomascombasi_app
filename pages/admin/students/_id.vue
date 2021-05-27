<template>
  <div>
    <Header :id="student.id || ''" title="Student Editor" />

    <div v-if="student.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="student.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="student.updated_at" />
      </div>
    </div>
    <div class="mt-8">
      <form @submit.prevent="$store.dispatch('admin/students/updateHeader')">
        <div class="flex justify-between">
          <Input
            v-model="name"
            class="flex-grow"
            label="Name"
            type="text"
            required
          />

          <Input
            v-model="email"
            class="ml-4 flex-grow"
            label="Email"
            type="text"
            required
          />

          <!-- <Select
            v-model="student.language"
            class="ml-4"
            label="Language"
            disabled
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select> -->
        </div>

        <Textarea v-model="bio" class="mt-4" label="Bio" required />

        <div class="flex mt-4">
          <Input
            v-model="roles"
            class="flex-grow"
            label="Roles"
            type="text"
            required
          />

          <Input
            v-model="interests"
            class="ml-4 flex-grow"
            label="Interests"
            type="text"
            required
          />
        </div>

        <div class="flex justify-end mt-8">
          <Button type="submit" label="Update"> </Button>
        </div>
      </form>

      <div class="border p-4 mt-8">
        <TitleSmall>Courses</TitleSmall>
        <div class="p-4">
          <div
            v-for="(course, index) in courses"
            :key="course.id"
            type="button"
            class="text-sm block"
          >
            <div
              class="flex p-2"
              :class="{
                'bg-gray-100': index % 2 === 0,
                'bg-gray-200': index % 2 !== 0,
              }"
            >
              <div class="ml-6 flex-grow">
                {{ courseName(course.course_id) }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4"
                @click="
                  $store.dispatch(
                    'admin/students/removeCourse',
                    course.course_id
                  )
                "
              >
                Remove
              </button>
              <nuxt-link
                class="text-xs text-green-800 px-4"
                :to="`/admin/courses/${course.course_id}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="courses.length === 0"
            class="text-sm text-center text-gray-600"
          >
            This student actually don't have any courses, you should start
            adding courses to this student.
          </div>
        </div>
      </div>

      <div class="p-4 border mt-4">
        <TitleSmall>Available Courses</TitleSmall>
        <p class="mb-4 text-xs text-gray-700">
          To connect a course with the student, just click in the Add button in
          front of the course.
          <strong>The course MUST be released</strong> before you add it to
          student. Remember that you <strong>DON'T</strong> need to save the
          changes after add the course, since it will be saved automatically
        </p>
        <div class="p-4">
          <div
            v-for="(course, index) in availableCourses"
            :key="course.id"
            type="button"
            class="text-sm block"
          >
            <div
              class="flex p-2"
              :class="{
                'bg-gray-100': index % 2 === 0,
                'bg-gray-200': index % 2 !== 0,
              }"
            >
              <div class="ml-4 flex-grow">
                {{ course.title }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4 font-bold text-blue-900"
                @click="
                  $store.dispatch('admin/students/appendCourse', course.id)
                "
              >
                Add
              </button>
              <nuxt-link
                class="text-xs text-green-800 px-4"
                :to="`/admin/courses/${course.id}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="availableCourses.length === 0"
            class="text-sm text-center text-gray-600"
          >
            You don't have any courses to add to this module,
            <nuxt-link class="underline" to="/admin/courses/new">
              click here
            </nuxt-link>
            and create your first course.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, User } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/students/fetchStudent', id)
    await this.$store.dispatch('admin/courses/fetchCourses')
  },

  computed: {
    allCourses(): Course[] {
      return this.$store.getters['admin/courses/courses']
    },

    availableCourses(): Course[] {
      if (this.allCourses?.length > 0) {
        return this.allCourses.filter((course: Course) => {
          if (!course.released) {
            return false
          }
          return !this.courses?.some((c: any) => c.course_id === course.id)
        })
      }
      return []
    },

    student(): User {
      return this.$store.getters['admin/students/student']
    },

    name: {
      get(): string {
        return this.student.name
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_NAME', value)
      },
    },

    email: {
      get(): string {
        return this.student.email
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_EMAIL', value)
      },
    },

    bio: {
      get(): string {
        return this.student.bio
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_BIO', value)
      },
    },

    avatar: {
      get(): string {
        return this.student.avatar
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_AVATAR', value)
      },
    },

    courses(): any[] {
      if (this.student.courses) {
        return this.student.courses
      }
      return []
    },

    roles(): string {
      if (this.student.roles) {
        return this.student.roles.join(', ')
      }
      return ''
    },

    interests(): string {
      if (this.student.interests) {
        return this.student.interests.join(', ')
      }
      return ''
    },
  },

  methods: {
    courseName(id: string): string {
      return this.$store.getters['admin/courses/courseNameById'](id)
    },
  },
})
</script>
