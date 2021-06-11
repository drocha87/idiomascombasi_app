export interface Lead {
  name?: string
  email: string
  created_at: Date
}

export interface Resource {
  id?: string
  type: string
  url: string
  name: string
  expires_in: number
  description: string
  created_at?: Date
}

export interface Lesson {
  id?: string
  title: string
  description: string
  language: string
  duration: number
  resources: Resource[]
  kind: string
  created_at: string
  updated_at: string
}

export interface Module {
  id?: string
  title: string
  description: string
  language: string
  lessons: Lesson[]
}

export interface Course {
  id?: string
  title: string
  language: string
  short_description: string
  description: string
  image: string
  available: boolean
  visible: boolean
  released: boolean
  author: string
  wywl: string
  kind: string
  certificate: boolean
  requiriments: string
  modules_info: Module[]
  modules: any[]

  expires_at: string
}

export interface UserContactInfo {
  email: string
  phone: string
  address: string
}

export interface UserPersonalInfo {
  name: string
  avatar: string
  nickname: string
  bio: string
  birthday: Date
  sex: string
}

export interface User extends UserPersonalInfo, UserContactInfo {
  id?: string
  courses: Course[]
  langauges: any[]
  roles: string[]
  interests: string[]
}

export interface Answer {
  id?: string
  text: string
  correct: boolean
}

export interface Question {
  id?: string
  title: string
  language: string
  level: number
  resources: Resource[]
  answers: any[]
}

export interface Questionaire {
  id?: string
  title: string
  language: string
  description: string
  questions: any[]
}
