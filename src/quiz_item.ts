import QuizCharacterState from '@/quiz_state'
import QuizScorer from '@/quiz_scorer'

export default class QuizItem {
    private _scorers: QuizScorer[]
    private _coded: string;
    private _description: string;
    private _expected_answers: Array<string>;

    characterState(answer: string): [string, QuizCharacterState][] {
        answer = answer.trim()
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
        answer = answer.trim()
        for (const scorer of this._scorers) {
            if (scorer.solved(answer, this._coded)) {
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