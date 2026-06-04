export interface ThreadApplication {
  id: number
  jobId: string
  title: string
  company: string
  location: string
  applyUrl: string
  score: number
  reasoning: string
  matchedSkills: string[]
  missingSkills: string[]
  coverLetter: string
  status: string
  appliedAt: string
}

export interface ThreadStats {
  cvName: string
  rawJobs: number
  filteredJobs: number
  applications: number
  createdAt: string
}

export interface ThreadData {
  thread_id: string
  stats: ThreadStats | null
  applications: ThreadApplication[]
}

export interface ThreadResponse {
  success: boolean
  empty: boolean
  message?: string
  data: ThreadData | null
}

export interface StoredThread {
  id: string
  createdAt: string
}