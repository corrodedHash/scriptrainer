// import QuizItem from './quiz_item'
import QuizItem from '@/quiz_item'
import { DictQuizScorer } from '@/quiz_scorer'

import cyrillic_dict from '@/assets/cyrillic.json'
import russian_words from '@/assets/russian_words.json'

export default function get_cyrillic(): Array<QuizItem> {
    let result = Array<QuizItem>()
    for (const word of russian_words.data) {
        result.push(new QuizItem(word, [new DictQuizScorer(cyrillic_dict, true)]))
    }

    return result
}