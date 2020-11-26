<template>
  <div id="letters">
    <span
      v-for="[index, char, css] in letterStates"
      v-bind:class="css"
      v-bind:key="index"
      >{{ char }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuizCharacterState from "@/quiz_state";
export default defineComponent({
  name: "MatchingLetters",
  props: ["statefulLetters"],
  computed: {
    letterStates() {
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
      for (const [char, state] of this.statefulLetters) {
        result.push([i, char, stateMap(state)]);
        i += 1;
      }
      return result;
    },
  },
});
</script>
<style scoped>
.quizCharacterCorrect {
  color: blue;
}

.quizCharacterWrong {
  color: red;
}

.quizCharacterUntouched {
  color: black;
}
</style>
