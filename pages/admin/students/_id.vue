<template>
  <div>
    <h1 class="text-4xl font-ember font-light">
      <StudentNickname :student="student" />
    </h1>

    <div v-if="student.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="student.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="student.updated_at" />
      </div>
    </div>

    <ContainerAccordion title="Contact Info" class="mt-8">
      <form
        @submit.prevent="$store.dispatch('admin/students/updateContactInfo')"
      >
        <div class="flex justify-between">
          <Input
            v-model="email"
            class="flex-grow"
            label="Email"
            type="text"
            required
          />

          <Input
            v-model="phone"
            class="ml-4 flex-grow"
            label="Phone"
            type="tel"
            required
          />
        </div>

        <Textarea v-model="address" class="mt-4" label="Address" />

        <div class="flex justify-between items-center mt-8">
          <Button
            v-if="student.password === ''"
            type="button"
            label="Invite to Campus"
          >
          </Button>
          <Button class="ml-auto" type="submit" label="Update"> </Button>
        </div>
      </form>
    </ContainerAccordion>

    <ContainerAccordion title="Personal Info" class="mt-8">
      <form
        @submit.prevent="$store.dispatch('admin/students/updatePersonalInfo')"
      >
        <div class="flex justify-between">
          <Input
            v-model="name"
            class="flex-grow"
            label="Name"
            type="text"
            required
          />

          <Input
            v-model="birthday"
            class="ml-4 flex-grow"
            label="Birthday"
            type="date"
            required
          />
        </div>

        <div class="flex justify-between mt-4">
          <Input
            v-model="nickname"
            class="flex-grow"
            label="Nickname"
            type="text"
          />
          <Input
            v-model="avatar"
            class="ml-4 flex-grow"
            label="Avatar"
            type="url"
          />
        </div>

        <Textarea v-model="bio" class="mt-4" label="Bio" required />

        <div class="flex justify-end mt-8">
          <Button type="submit" label="Update"> </Button>
        </div>
      </form>
    </ContainerAccordion>

    <ContainerSlot title="Documents" class="mt-8">
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
      <div class="h-2"></div>
      <div
        v-for="(document, index) in documents"
        :key="document.name"
        class="border-b p-1 mb-2 flex justify-between"
      >
        <div
          class="text-sm text-blueaws cursor-pointer"
          @click="fetchDocument(document.name)"
        >
          {{ document.name }}
        </div>
        <div class="flex items-center">
          <div class="text-sm text-blueaws lowercase">
            {{ document.ext.substring(1) }}
          </div>
          <button
            class="ml-8 text-xs text-red-700 lowercase focus:outline-none"
            @click="removeDocument(document.name, index)"
          >
            Remove
          </button>
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot class="mt-8" title="Roles and Interests">
      <div class="flex mt-4">
        <!-- TODO: add a way to edit these fields -->
        <Input
          v-model="roles"
          class="flex-grow"
          label="Roles"
          type="text"
          disabled
        />

        <Input
          v-model="interests"
          class="ml-4 flex-grow"
          label="Interests"
          type="text"
          disabled
        />
      </div>
    </ContainerSlot>

    <ContainerSlot class="mt-8" title="Languages">
      <div class="flex items-end">
        <div class="flex-grow font-ember text-sm text-gray-700">
          Add a new language to student, pay attention before add, because will
          not be possible to remove this language from user after your inserted
          it.
        </div>
        <SelectLanguage v-model="userLanguage" class="mx-8" />
        <Button
          label="Add Language"
          small
          @click="
            $store.dispatch('admin/students/appendLanguage', userLanguage)
          "
        />
      </div>

      <div v-if="student.languages" class="flex mt-8">
        <div
          v-for="lang in student.languages"
          :key="lang.id"
          class="mr-8 min-w-1/4"
        >
          <SelectLevel
            class="capitalize"
            :value="lang.level"
            :label="`${lang.language} Level`"
            @input="(level) => changeLangLevel(level, lang)"
          />
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot title="Courses" class="mt-8">
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
                $store.dispatch('admin/students/removeCourse', course.course_id)
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
          This student actually don't have any courses, you should start adding
          courses to this student.
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot title="Available Courses" class="mt-8">
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
              class="text-xs px-4 font-bold text-blue-900"
              @click="$store.dispatch('admin/students/appendCourse', course.id)"
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
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, User, UserCourse } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      userLanguage: 'english',
      file: '',
      loading: false,
      documents: [],
    }
  },

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/students/fetchStudent', id)
    await this.$store.dispatch('admin/courses/fetchCourses')

    this.documents = await this.$axios.$get(`/storage/users/${id}`)
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

    address: {
      get(): string {
        return this.student.address
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_ADDRESS', value)
      },
    },

    birthday: {
      get(): string {
        try {
          const date = new Date(this.student.birthday)
          return date.toISOString().split('T')[0]
        } catch (_) {
          return '1900-01-01'
        }
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_BIRTHDAY', value)
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

    phone: {
      get(): string {
        return this.student.phone || '+0000000000000'
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_PHONE', value)
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

    nickname: {
      get(): string {
        return this.student.nickname
      },
      set(value: string): void {
        this.$store.commit('admin/students/SET_STUDENT_NICKNAME', value)
      },
    },

    courses(): UserCourse[] {
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

    async changeLangLevel(level: number, lang: any) {
      await this.$store.dispatch('admin/students/changeLanguageLevel', {
        level,
        language: lang,
      })
    },

    async fetchDocument(fileName: string) {
      try {
        const blob: Blob = await this.$axios.$get(
          `/storage/users/${this.student.id}/${fileName}`,
          { responseType: 'blob' }
        )
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      }
    },

    async removeDocument(fileName: string, index: number) {
      try {
        if (
          confirm(
            'Are you sure you want to remove this file? This process is ireversible.'
          )
        ) {
          await this.$axios.$delete(
            `storage/users/${this.student.id}/${fileName}`
          )
          this.documents.splice(index, 1)
        }
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      }
    },

    async submitFiles() {
      try {
        const formData = new FormData()
        formData.append('file', this.file)
        this.loading = true
        await this.$axios.$post(`/storage/users/${this.student.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        // this.documents = await this.$axios.$get('/admin/resources/')
        // this.file = ''
      } catch (error) {
        // console.log(error)
        this.$store.commit('info/SET_ERROR', error)
      } finally {
        this.loading = false
      }
    },

    handleFileUpload() {
      this.file = (this.$refs?.file as any)?.files[0]
    },
  },
})
</script>
