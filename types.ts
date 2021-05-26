export interface Module {
  id?: string
  title: string
  description: string
  language: string
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
  modules: string[]

  expires_at: string
}

// type Lesson struct {
// 	ID          primitive.ObjectID `json:"id,omitempty"  bson:"_id,omitempty"`
// 	Title       string             `json:"title"  bson:"title"`
// 	Description string             `json:"description"  bson:"description"`
// 	Duration    int                `json:"duration"  bson:"duration"`
// 	Resources   []Resource         `json:"resources"  bson:"resources"`
// 	Language    string             `json:"language"  bson:"language"`
// 	Kind        string             `json:"kind"  bson:"kind"`
// 	CreatedAt   time.Time          `json:"created_at"  bson:"created_at"`
// 	UpdatedAt   time.Time          `json:"updated_at"  bson:"updated_at"`
// }

export interface Resource {
  id?: string
  type: string
  url: string
  name: string
  description: string
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

export interface User {
  id?: string
  email: string
  name: string
  bio: string
}
