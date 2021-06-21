<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Leads</h1>

    <div class="mt-4 text-left w-full text-sm">
      {{ leads.length }} leads found
    </div>

    <ContainerSlot class="w-full mt-8" title="Leads">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterLead"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search lead"
        />
      </div>
      <InfoLead v-for="lead in leads" :key="lead.id" class="mb-2" :lead="lead">
      </InfoLead>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lead } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterLead: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('admin/leads/fetchLeads')
  },

  computed: {
    leads(): Lead[] {
      const leads: Lead[] = this.$store.getters['admin/leads/leads']
      return leads.filter((q: Lead) => {
        const regex = new RegExp(this.filterLead, 'gi')
        return this.filterLead === '' || regex.test(q.email)
      })
    },
  },
})
</script>
