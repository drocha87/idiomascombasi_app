<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">{{ question.title }}</h1>

    <div v-if="question.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="question.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="question.updated_at" />
      </div>
    </div>

    <ContainerSlot title="Question Information" class="mt-8">
      <form @submit.prevent="$store.dispatch('admin/questions/update')">
        <div class="flex justify-between items-end">
          <Textarea
            v-model.trim="title"
            class="w-full"
            label="Question"
            type="text"
            rows="4"
            required
          />

          <div class="flex flex-col ml-8">
            <SelectLanguage v-model="question.language" disabled />
            <SelectLevel v-model="level" class="mt-4" />
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <Button
            class="w-44"
            type="button"
            label="Remove Question"
            small
            bg-color="red"
            @click="removeQuestion()"
          >
          </Button>
          <Button type="submit" label="Update" small> </Button>
        </div>
      </form>
    </ContainerSlot>

    <ContainerSlot class="mt-8" title="Answers">
      <form
        @submit.prevent="
          $store.dispatch('admin/questions/appendAnswer', answer)
        "
      >
        <Textarea v-model="answer.text" label="Answer" />
        <div class="text-right">
          <Button label="Add" small> </Button>
        </div>
      </form>

      <div class="mt-4">
        <div v-for="(res, index) in answers" :key="index" class="mt-2 text-sm">
          <InfoAnswer class="m-1" :answer="res">
            <template #action>
              <div
                class="
                  flex
                  items-end
                  font-ember
                  text-xs text-gray-500
                  justify-end
                  mt-2
                "
              >
                <button
                  type="button"
                  class="focus:outline-none"
                  :class="{
                    'text-green-500': res.correct,
                    'text-red-500': !res.correct,
                  }"
                  @click="
                    $store.dispatch(
                      'admin/questions/toggleAnswerCorrect',
                      res.id
                    )
                  "
                >
                  {{ res.correct ? 'Correct' : 'Incorrect' }}
                </button>
                <button
                  type="button"
                  class="text-red-500 focus:outline-none ml-12"
                  @click="deleteResource(res.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </InfoAnswer>
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot class="mt-12" title="Resources">
      <form @submit.prevent="addResource">
        <div class="flex items-center mt-4">
          <Select v-model="resource.type" label="Type">
            <option value="url">URL</option>
            <option value="pdf">PDF</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </Select>

          <Input
            v-model.trim="resource.name"
            class="flex-grow ml-4"
            label="Name"
            type="text"
            required
          />

          <Input
            v-model="resource.url"
            class="flex-grow ml-4"
            label="URL"
            type="url"
          />
        </div>

        <Textarea
          v-model="resource.description"
          label="Description"
          class="mt-4"
        />
        <div class="text-right">
          <Button label="Add" small> </Button>
        </div>
      </form>

      <div class="mt-4">
        <div
          v-for="(res, index) in resources"
          :key="index"
          class="mt-2 text-sm"
        >
          <ResourceInfo
            class="m-1"
            :label="res.name"
            :type="res.type"
            :description="res.description"
            :to="res.url"
          >
            <template #action>
              <div
                class="
                  flex
                  items-end
                  font-ember
                  text-xs text-gray-500
                  justify-between
                  mt-2
                "
              >
                <div class="flex-grow">{{ res.url }}</div>
                <ExpiresIn
                  v-if="res.expires_in > 0"
                  class="mr-8"
                  :expires-in="res.expires_in"
                  :created-at="res.created_at"
                />
                <button
                  type="button"
                  class="text-red-500 focus:outline-none"
                  @click="deleteResource(res.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </ResourceInfo>
        </div>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Resource } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    const answer: any = {}

    const resource: Resource = {
      type: 'url',
      url: '',
      name: '',
      description: '',
      expires_in: 0,
    }

    return {
      answer,
      resource,
    }
  },

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/questions/fetchQuestion', id)
  },

  computed: {
    question() {
      return this.$store.getters['admin/questions/question']
    },

    title: {
      get(): string {
        return this.question.title
      },
      set(value: string): void {
        this.$store.commit('admin/questions/SET_QUESTION_TITLE', value)
      },
    },

    level: {
      get(): string {
        return this.question.level
      },
      set(value: number): void {
        this.$store.commit('admin/questions/SET_QUESTION_LEVEL', value)
      },
    },

    answers(): any[] {
      return this.question?.answers || []
    },

    resources(): Resource[] {
      return this.question?.resources || []
    },
  },

  methods: {
    async deleteResource(id: string) {
      await this.$store.dispatch('admin/questions/deleteResource', id)
    },

    async addResource() {
      await this.$store.dispatch('admin/questions/addResource', this.resource)
      this.resource.type = 'url'
      this.resource.url = ''
      this.resource.name = ''
      this.resource.description = ''
    },

    async removeQuestion() {
      await this.$store.dispatch('admin/questions/removeQuestion')
    },
  },
})
</script>
