export interface Contest {
  id: string
  name: string
  platform: string
  startTime: string
  endTime: string
  duration: string
  status: 'upcoming' | 'ongoing' | 'past'
  difficulty?: 'easy' | 'medium' | 'hard'
  url?: string
}

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface FilterState {
  platform: string
  status: string
  difficulty: string
}
