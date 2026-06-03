export interface ScoredJob {
  id: string
  title: string
  company: string
  location: string
  score: number
  reasoning: string
  matchedSkills: string[]
  missingSkills: string[]
  coverLetter: string
  applyUrl: string
}