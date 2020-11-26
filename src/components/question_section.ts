import QuizItem from "@/quiz_item";
import QuizCharacterState from "@/quiz_state";
import MatchingLetters from "@/components/matching_letters.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "question_section",
  components: { MatchingLetters },
  props: {
    quizItem: { type: QuizItem, required: true },
  },
  data() {
    return {
      answer: "",
      question_states: this.quizItem.characterState(""),
    };
  },
  watch: {
    answer: function(newAnswer: string, _) {
      this.question_states = this.quizItem.characterState(newAnswer);
      if (this.quizItem.solved(newAnswer)) {
        this.$emit("solved");
        this.answer = "";
      }
    },
    quizItem: function(newItem: QuizItem, _): void {
      this.question_states = this.quizItem.characterState("");
    },
  },
  computed: {
    answerIncorrect(): boolean {
      for (const [_, state] of this.question_states) {
        if (state === QuizCharacterState.Wrong) {
          return true;
        }
      }
      return false;
    },
    expectedAnswer(): string {
      return this.quizItem.expectedAnswers.join(", ");
    },
    letterStates(): Array<[number, string, string]> {
      let result: Array<[number, string, string]> = [];
      const stateMap = (state: QuizCharacterState) => {
        switch (state) {
          case QuizCharacterState.Correct:
            return "quizCharacterCorrect";
          case QuizCharacterState.Wrong:
            return "quizCharacterWrong";
          case QuizCharacterState.Untouched:
            return "quizCharacterUntouched";
        }
      };
      let i = 0;
      for (const [char, state] of this.question_states) {
        result.push([i, char, stateMap(state)]);
        i += 1;
      }
      return result;
    },
  },
});
