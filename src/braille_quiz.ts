import { ListQuizScorer, QuizItem } from '@/quiz_item'

import brailledict from '@/assets/braille.json'
import english_words from '@/assets/english_words.json'

function translate_braille(clear: string, dict: { [key: string]: string }): string {
    let result = ""
    for (const char of clear.toUpperCase()) {
        if (dict[char] === undefined) {
            throw char + " not in braille dict"
        }
        result += dict[char]
    }
    return result
}

export default function get_braille(): Array<QuizItem> {
    let result = Array<QuizItem>()
    for (const word of english_words.data) {
        result.push(new QuizItem(translate_braille(word, brailledict), [new ListQuizScorer(word.split(''))]))
    }
    return result
}