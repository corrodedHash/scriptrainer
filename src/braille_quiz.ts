import QuizItem from "@/quiz_item";
import { ListQuizScorer } from "@/quiz_scorer";

function translate_braille(
  clear: string,
  dict: any
): string {
  let result = "";
  for (const char of clear.toUpperCase()) {
    if (dict[char] === undefined) {
      throw char + " not in braille dict";
    }
    result += dict[char];
  }
  return result;
}
let cached_result: Array<QuizItem> = [];
export default async function get_braille(): Promise<Array<QuizItem>> {
  if (cached_result.length === 0) {
    const result = Array<QuizItem>();

    const brailledict = await import("@/assets/braille.json");
    const english_words = await import("@/assets/english_words.json");
    for (const word of english_words.data) {
      result.push(
        new QuizItem(translate_braille(word, brailledict), [
          new ListQuizScorer(word.split(""), true),
        ])
      );
    }
    cached_result = result;
  }
  return cached_result;
}
