import { mya2rom, to_syllables } from '@/burmese/mya2rom.mjs'
import QuizItem from '@/quiz_item'
import QuizScorer from '@/quiz_scorer'
import QuizCharacterState from '@/quiz_state'

let cached_result: Array<QuizItem> = []

const MYANMAR_SYSTEM = 'simple2'

class BurmesePerCharQuizScorer extends QuizScorer {
  score(answer: string, question: string): [string, QuizCharacterState][] {
    const syllables: string[] = to_syllables(question)
    const result: [string, QuizCharacterState][] = []
    for (const s of syllables) {
      const translated = mya2rom(s, MYANMAR_SYSTEM).replace("'", '')
      if (translated.length <= answer.length) {
        const flag =
          answer.substring(0, translated.length) === translated
            ? QuizCharacterState.Correct
            : QuizCharacterState.Wrong
        result.push([s, flag])
        answer = answer.substring(translated.length)
      } else {
        const flag =
          translated.substring(0, answer.length) === answer
            ? QuizCharacterState.Untouched
            : QuizCharacterState.Wrong
        result.push([s, flag])
        answer = ''
      }
    }
    return result
  }
  expected_answer(question: string): string {
    return mya2rom(question, MYANMAR_SYSTEM).replace("'", '')
  }
}

export default async function get_myanmar(): Promise<Array<QuizItem>> {
  if (cached_result.length === 0) {
    const result = Array<QuizItem>()
    const words = await import('@/assets/burmese_words.json')

    for (const word of words.data) {
      result.push(new QuizItem(word, [new BurmesePerCharQuizScorer()]))
    }
    cached_result = result
  }
  return cached_result
}
