import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User, Course, Module, Lesson } from '@/types'

export const state = () => {
  const student: Partial<User> = {}

  const course: Partial<Course> = {}
  const courses: Course[] = []

  const module: Partial<Module> = {}
  const modules: Module[] = []

  const lesson: Partial<Lesson> = {}
  const lessons: Lesson[] = []

  const position: number = 0

  return {
    student,
    course,
    courses,

    module,
    modules,

    lesson,
    lessons,

    position,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  student(state) {
    return state.student
  },

  course(state) {
    return state.course
  },

  courses(state) {
    return state.courses
  },

  module(state) {
    return state.module
  },

  modules(state) {
    return state.modules
  },

  lesson(state) {
    return state.lesson
  },

  lessons(state) {
    return state.lessons
  },

  position(state) {
    return state.position
  },
}

export const mutations: MutationTree<RootState> = {
  SET_STUDENT(state, student: any): void {
    state.student = Object.assign(state.student, student)
  },

  SET_LESSON(state, lesson: Partial<Lesson>) {
    state.lesson = lesson
  },

  SET_LESSONS(state, lessons: Lesson[]) {
    state.lessons = lessons
  },

  SET_LESSON_POSITION(state, position: number) {
    state.position = position
  },

  SET_COURSE(state, course: Partial<Course>) {
    state.course = course
  },

  SET_COURSES(state, courses: Course[]) {
    state.courses = courses
  },

  SET_MODULE(state, module: Partial<Module>) {
    state.module = module
  },

  SET_MODULES(state, modules: Module[]) {
    state.modules = modules
  },

  SET_NAME(state, name: string): void {
    state.student.name = name
  },

  SET_BIO(state, bio: string): void {
    state.student.bio = bio
  },
}

export const actions: ActionTree<RootState, RootState> = {
  fetchStudent({ commit }) {
    // const course = await this.$axios.$get('/auth/student')
    commit('SET_STUDENT', this.$auth.user)
  },

  async fetchCourses({ commit }) {
    const cs = await this.$studentapi.$get('courses')
    commit('SET_COURSES', cs)
  },

  async fetchCourse({ commit }, id: string) {
    try {
      const course = await this.$studentapi.$get(`courses/${id}`)
      commit('SET_COURSE', course)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchCourseModules({ commit, state }) {
    try {
      const modules = await this.$studentapi.$get(
        `courses/${state.course.id}/modules`
      )
      commit('SET_MODULES', modules)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchCourseLessons({ commit, state }) {
    try {
      const lessons = await this.$studentapi.$get(
        `courses/${state.course.id}/lessons`
      )
      commit('SET_LESSONS', lessons)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchLesson(
    { commit },
    { course_id, lesson_id }: { course_id: string; lesson_id: string }
  ) {
    try {
      const { lesson, module, course, position } = await this.$studentapi.$get(
        `/courses/${course_id}/lessons/${lesson_id}`
      )
      commit('SET_COURSE', course)
      commit('SET_MODULE', module)
      commit('SET_LESSON', lesson)
      commit('SET_LESSON_POSITION', position)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateInfo({ commit, state }) {
    try {
      await this.$studentapi.$patch('/info', {
        name: state.student.name,
        bio: state.student.bio,
      })
      await this.$auth.fetchUser()
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
