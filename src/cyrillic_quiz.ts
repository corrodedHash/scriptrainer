// import QuizItem from './quiz_item'
import QuizItem from "@/quiz_item";
import { DictQuizScorer } from "@/quiz_scorer";

let cached_result: Array<QuizItem> = [];

export default async function get_cyrillic(): Promise<Array<QuizItem>> {
  if (cached_result.length === 0) {
    const cyrillic_dict = await import("@/assets/cyrillic.json");
    const russian_words = await import("@/assets/russian_words.json");
    let result = Array<QuizItem>();
    for (const word of russian_words.data) {
      result.push(
        new QuizItem(word, [new DictQuizScorer(cyrillic_dict.default, true)])
      );
    }
    cached_result = result;
  }
  return cached_result;
}
