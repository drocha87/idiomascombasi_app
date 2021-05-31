<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Campus ICB Admin Panel" />

    <div class="flex mt-4">
      <div class="flex-grow mr-4">
        <ContainerSlot title="Students">
          <div class="flex flex-wrap">
            <InternLink to="students" append>View Students</InternLink>
            <InternLink class="ml-8" to="courses/new" append>
              Add Student
            </InternLink>
          </div>
        </ContainerSlot>

        <ContainerSlot class="mt-4" title="Courses">
          <div class="flex flex-wrap">
            <InternLink to="courses" append>View Courses</InternLink>
            <InternLink class="ml-8" to="courses/new" append>
              Create Course
            </InternLink>
          </div>
        </ContainerSlot>

        <ContainerSlot class="mt-4" title="Modules">
          <div class="flex flex-wrap">
            <InternLink to="modules" append>View Modules</InternLink>
            <InternLink class="ml-8" to="modules/new" append>
              Create Module
            </InternLink>
          </div>
        </ContainerSlot>

        <ContainerSlot class="mt-4" title="Lessons">
          <div class="flex flex-wrap">
            <InternLink to="lessons" append>View Lessons</InternLink>
            <InternLink class="ml-8" to="lessons/new" append>
              Create Lesson
            </InternLink>
          </div>
        </ContainerSlot>

        <ContainerSlot class="mt-4" title="Questions">
          <div class="flex flex-wrap">
            <InternLink to="questions" append>View Questions</InternLink>
            <InternLink class="ml-8" to="questions/new" append>
              Create Question
            </InternLink>
          </div>
        </ContainerSlot>
      </div>

      <div class="w-1/4">
        <ContainerSlot title="Useful Links">
          <div class="flex flex-col">
            <ExternalLink href="https://forms.google.com">
              Google Forms
            </ExternalLink>
            <ExternalLink class="mt-2" href="https://drive.google.com">
              Google Drive
            </ExternalLink>
          </div>
        </ContainerSlot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin',
})
</script>
