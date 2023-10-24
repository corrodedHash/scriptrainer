import QuizItem from '@/quiz_item'
import QuizScorer from '@/quiz_scorer'
import QuizCharacterState from '@/quiz_state'

let cached_result: Array<QuizItem> = []

const MYANMAR_SYSTEM = 'simple2'

class BurmesePerCharQuizScorer extends QuizScorer {
  myaModule: typeof import('@/burmese/mya2rom.mjs')
  constructor(myaModule: typeof import('@/burmese/mya2rom.mjs')) {
    super()
    this.myaModule = myaModule
  }
  score(answer: string, question: string): [string, QuizCharacterState][] {
    answer = answer.toLowerCase()
    const syllables: string[] = this.myaModule.to_syllables(question)
    const result: [string, QuizCharacterState][] = []
    for (const s of syllables) {
      const translated = this.myaModule.mya2rom(s, MYANMAR_SYSTEM).replace("'", '')
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
    return this.myaModule.mya2rom(question, MYANMAR_SYSTEM).replace("'", '')
  }
}

export default async function get_myanmar(): Promise<Array<QuizItem>> {
  const myaModule = await import('@/burmese/mya2rom.mjs')

  if (cached_result.length === 0) {
    const result = Array<QuizItem>()
    const words = await import('@/assets/burmese_words.json')

    for (const word of words.data) {
      result.push(new QuizItem(word, [new BurmesePerCharQuizScorer(myaModule)]))
    }
    cached_result = result
  }
  return cached_result
}
