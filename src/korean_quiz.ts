
import * as kpop from 'kpop'
import { QuizItem, FunctionQuizScorer, WholeWordQuizScorer } from './quiz_item'
import korean_words from './assets/korean.json'


export default function get_korean(): Array<QuizItem> {
    let result = Array<QuizItem>()
    for (const [hangul, _, desc] of korean_words.data) {
        result.push(new QuizItem(hangul, [new FunctionQuizScorer(kpop.romanize), new WholeWordQuizScorer(kpop.romanize(hangul))], desc))
    }
    return result
}