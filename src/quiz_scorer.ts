import QuizCharacterState from '@/quiz_state'

export default abstract class QuizScorer {
  abstract score(answer: string, question: string): [string, QuizCharacterState][]
  abstract expected_answer(question: string): string
  solved(answer: string, question: string): boolean {
    for (const [_, state] of this.score(answer, question)) {
      if (state != QuizCharacterState.Correct) {
        return false
      }
    }
    return true
  }
}

export class WholeWordQuizScorer extends QuizScorer {
  private _word: string

  constructor(word: string) {
    super()
    this._word = word
  }

  score(answer: string, question: string): [string, QuizCharacterState][] {
    let state = QuizCharacterState.Wrong
    if (answer === this._word) {
      state = QuizCharacterState.Correct
    } else if (question.indexOf(answer) >= 0) {
      state = QuizCharacterState.Untouched
    }
    const result: [string, QuizCharacterState][] = []
    for (const char of question) {
      result.push([char, state])
    }
    return result
  }

  expected_answer(_: string): string {
    return this._word
  }
}

export abstract class PerCharQuizScorer extends QuizScorer {
  private _anycase: boolean

  constructor(anycase: boolean) {
    super()
    this._anycase = anycase
  }

  score(answer: string, question: string): [string, QuizCharacterState][] {
    const result: [string, QuizCharacterState][] = []
    if (this._anycase) {
      answer = answer.toLowerCase()
    }
    for (let index = 0; index < question.length; index++) {
      const character = question[index]
      const rawSyllable = this.get_syllable(character, index)
      const syllable = this._anycase ? rawSyllable.toLowerCase() : rawSyllable
      let result_state = QuizCharacterState.Wrong
      if (syllable.length > answer.length) {
        result_state = QuizCharacterState.Untouched
      } else if (answer.indexOf(syllable) === 0) {
        result_state = QuizCharacterState.Correct
      }
      result.push([character, result_state])
      answer = answer.substring(syllable.length)
    }
    return result
  }

  expected_answer(question: string): string {
    let result = ''
    for (let index = 0; index < question.length; index++) {
      const element = question[index]
      result += this.get_syllable(element, index)
    }
    return result
  }

  abstract get_syllable(character: string, index: number): string
}

export class DictQuizScorer extends PerCharQuizScorer {
  private _dict: { [key: string]: string }

  constructor(dict: { [key: string]: string }, anycase: boolean) {
    super(anycase)
    this._dict = dict
  }

  get_syllable(character: string, _: number): string {
    if (this._dict[character] === undefined) {
      throw [this, character, 'character not in dict']
    }
    return this._dict[character]
  }
}

export class ListQuizScorer extends PerCharQuizScorer {
  private _syllables: Array<string>

  constructor(syllables: string[], anycase: boolean) {
    super(anycase)
    this._syllables = syllables
  }

  get_syllable(_: string, index: number): string {
    return this._syllables[index]
  }
}

export class FunctionQuizScorer extends PerCharQuizScorer {
  private _func: (char: string) => string

  constructor(func: (char: string) => string, anycase: boolean) {
    super(anycase)
    this._func = func
  }

  get_syllable(character: string, _: number) {
    return this._func(character)
  }
}
