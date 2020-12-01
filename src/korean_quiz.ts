import * as kpop from "kpop";
import QuizItem from "@/quiz_item";
import { FunctionQuizScorer, WholeWordQuizScorer } from "@/quiz_scorer";

let cached_result: Array<QuizItem> = [];
export default async function get_korean(): Promise<Array<QuizItem>> {
  if (cached_result.length === 0) {
    let result = Array<QuizItem>();
    const korean_words = await import("@/assets/korean.json");

    for (const [hangul, _, desc] of korean_words.data) {
      result.push(
        new QuizItem(
          hangul,
          [
            new FunctionQuizScorer(kpop.romanize, true),
            new WholeWordQuizScorer(kpop.romanize(hangul)),
          ],
          desc
        )
      );
    }
    cached_result = result;
  }
  return cached_result;
}
