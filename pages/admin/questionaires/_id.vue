<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header :id="questionaire.id || ''" title="Questionaire Editor" />

    <div v-if="questionaire.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="questionaire.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="questionaire.updated_at" />
      </div>
    </div>

    <div class="mt-8">
      <form @submit.prevent="$store.dispatch('admin/questionaires/update')">
        <div class="flex">
          <Input
            v-model="title"
            class="flex-grow"
            label="Title"
            type="text"
            required
          />
          <Select
            v-model="questionaire.language"
            class="ml-8"
            label="Language"
            disabled
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <Textarea
          v-model.trim="description"
          class="w-full"
          label="Description"
          type="text"
          rows="3"
          required
        />

        <div class="flex justify-between mt-8">
          <Button
            class="w-44"
            type="button"
            label="Remove Questionaire"
            small
            bg-color="red"
            @click="removeQuestion()"
          >
          </Button>
          <Button type="submit" label="Update" small> </Button>
        </div>
      </form>
    </div>

    <ContainerSlot class="mt-8" title="Questions">
      <div
        v-if="questions.length === 0"
        class="text-sm text-center text-gray-600"
      >
        This questionaire actually don't have any question, you should start
        adding questions to this questionaire.
      </div>
      <div v-else>
        <div v-for="(question, index) in questions" :key="question.question_id">
          <AdminDataItem
            :label="questionTitle(question.question_id)"
            :index="index"
            :visit="`/admin/questions/${question.question_id}`"
            @up="move('up', question.lesson_id)"
            @down="move('down', question.lesson_id)"
            @remove="
              $store.dispatch('admin/questionaires/removeQuestion', question.id)
            "
          />
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot class="mt-8" title="Available questions">
      <div
        v-if="availableQuestions.length === 0"
        class="text-sm text-center text-gray-600"
      >
        You don't have any question to add to this questionaire,
        <nuxt-link class="underline" to="/admin/questions/new">
          click here
        </nuxt-link>
        and create your first question compatible with this questionaire
      </div>
      <div
        v-for="(question, index) in availableQuestions"
        :key="question.id"
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
            {{ question.title }}
          </div>
          <button
            type="button"
            class="text-xs text-red-500 px-4 font-bold text-blue-900"
            @click="
              $store.dispatch('admin/questionaires/appendQuestion', question.id)
            "
          >
            Add
          </button>
          <nuxt-link
            class="text-xs text-green-800 px-4"
            :to="`/admin/questions/${question.id}`"
          >
            Visit
          </nuxt-link>
        </div>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Questionaire } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/questionaires/fetchQuestionaire', id)
    await this.$store.dispatch('admin/questions/fetchQuestions')
  },

  computed: {
    questionaire(): Questionaire {
      return this.$store.getters['admin/questionaires/questionaire']
    },

    questions(): any[] {
      return this.questionaire.questions || []
    },

    availableQuestions(): any[] {
      const allQuestions = this.$store.getters['admin/questions/questions']
      return allQuestions.filter((q: any) => {
        return (
          q.language === this.questionaire.language &&
          !this.questions?.some((qq: any) => qq.question_id === q.id)
        )
      })
    },

    title: {
      get(): string {
        return this.questionaire.title
      },
      set(value: string): void {
        this.$store.commit('admin/questionaires/SET_QUESTIONAIRE_TITLE', value)
      },
    },

    description: {
      get(): string {
        return this.questionaire.description
      },
      set(value: number): void {
        this.$store.commit(
          'admin/questionaires/SET_QUESTIONAIRE_DESCRIPTION',
          value
        )
      },
    },
  },

  methods: {
    questionTitle(id: string) {
      return this.$store.getters['admin/questions/questionTitleById'](id)
    },
  },
})
</script>
