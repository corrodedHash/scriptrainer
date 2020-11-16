export enum QuizCharacterState {
    Correct, Wrong, Untouched
}

export abstract class QuizScorer {
    abstract score(answer: string, question: string): [string, QuizCharacterState][];
    abstract expected_answer(question: string): string;
}

export class WholeWordQuizScorer extends QuizScorer {
    private _word: string;
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
        let result: [string, QuizCharacterState][] = []
        for (const char of question) {
            result.push([char, state])
        }
        return result
    }
    expected_answer(_: string): string {
        return this._word
    }
}

export abstract class PerCharQuizScorer {
    score(answer: string, question: string): [string, QuizCharacterState][] {
        let result: [string, QuizCharacterState][] = []
        for (let index = 0; index < question.length; index++) {
            const character = question[index];
            const syllable = this.get_syllable(character, index)
            let result_state = QuizCharacterState.Wrong
            if (syllable.length > answer.length) {
                result_state = QuizCharacterState.Untouched
            } else if (answer.indexOf(syllable) === 0) {
                result_state = QuizCharacterState.Correct
            }
            result.push([character, result_state])
            answer = answer.substr(syllable.length)
        }
        return result
    }
    expected_answer(question: string): string {
        let result = ""
        for (let index = 0; index < question.length; index++) {
            const element = question[index];
            result += this.get_syllable(element, index)
        }
        return result
    }
    abstract get_syllable(character: string, index: number): string;
}

export class DictQuizScorer extends PerCharQuizScorer {
    private _dict: { [key: string]: string };
    constructor(dict: { [key: string]: string }) {
        super();
        this._dict = dict
    }
    get_syllable(character: string, _: number): string {
        if (this._dict[character] === undefined) {
            throw [this, character, "character not in dict"]
        }
        return this._dict[character]
    }
}

export class ListQuizScorer extends PerCharQuizScorer {
    private _syllables: Array<string>;
    constructor(syllables: string[]) {
        super()
        this._syllables = syllables
    }
    get_syllable(_: string, index: number): string {
        return this._syllables[index]
    }
}

export class FunctionQuizScorer extends PerCharQuizScorer {
    private _func: (char: string) => string;
    constructor(func: (char: string) => string) {
        super()
        this._func = func
    }
    get_syllable(character: string, _: number) {
        return this._func(character)
    }
}

export class QuizItem {
    private _scorers: QuizScorer[]
    private _coded: string;
    private _description: string;
    private _expected_answers: Array<string>;

    characterState(answer: string): [string, QuizCharacterState][] {
        const compute_correct_count = (states: [string, QuizCharacterState][]): [number, number] => {
            let correct_count = 0
            let wrong_count = 0
            for (const [_, state] of states) {
                switch (state) {
                    case QuizCharacterState.Correct:
                        correct_count += 1; break;
                    case QuizCharacterState.Wrong:
                        wrong_count += 1
                        break;
                    case QuizCharacterState.Untouched: break;
                }
            }
            return [correct_count, wrong_count]
        }
        let result = undefined
        let correct_count = 0
        let wrong_count = 0
        for (const scorer of this._scorers) {
            let subresult = scorer.score(answer, this.rawQuestion)
            const [sub_correct_count, sub_wrong_count] = compute_correct_count(subresult)
            if (result === undefined || correct_count < sub_correct_count || (correct_count === sub_correct_count && wrong_count > sub_wrong_count)) {
                result = subresult
                correct_count = sub_correct_count
                wrong_count = sub_wrong_count
            }
        }
        return result === undefined ? [] : result
    }
    solved(answer: string): boolean {
        for (const expectedAnswer of this.expectedAnswers) {
            if (expectedAnswer === answer) {
                return true
            }
        }
        return false
    }
    get expectedAnswers(): Array<string> {
        let result = []
        for (const scorer of this._scorers) {
            result.push(scorer.expected_answer(this._coded))
        }
        return result.filter((v, i, a) => {
            return a.indexOf(v) === i
        })
    }
    constructor(coded: string, scorers: QuizScorer[], description?: string) {
        this._coded = coded;
        this._scorers = scorers
        this._description = (description !== undefined) ? description : ""
        this._expected_answers = []
        for (const scorer of this._scorers) {
            this._expected_answers.push(scorer.expected_answer(this._coded))
        }
        this._expected_answers = this._expected_answers.filter((v, i, a) => {
            return a.indexOf(v) === i
        })
    }
    get desc() {
        return this._description
    }
    get rawQuestion(): string {
        return this._coded
    }
}