<template>
  <div id="quizbox">
    <preview_section
      v-bind:quizItems="next_questions"
      v-if="question_queue !== null"
    />
    <question_section
      v-bind:quizItem="question_queue.current"
      v-on:solved="question_queue.pop()"
      v-if="question_queue !== null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import QuizItem from "@/quiz_item";
import get_braille from "@/braille_quiz";
import get_cyrillic from "@/cyrillic_quiz";
import get_korean from "@/korean_quiz";
import question_section from "@/components/question_section.vue";
import preview_section from "@/components/preview_section.vue";
import QuestionQueue from "@/quiz_queue";

export default defineComponent({
  components: {
    question_section,
    preview_section,
  },
  props: {
    peekCount: { type: Number, default: 3 },
    trainer: { type: String },
  },
  data() {
    return {
      question_queue: null as QuestionQueue | null,
      initialized: true,
    };
  },
  mounted() {
    get_braille().then((value: QuizItem[]) => {
      this.question_queue = new QuestionQueue(value);
    });
  },
  watch: {
    trainer: function() {
      if (this.trainer === "Braille") {
        this.question_queue = null;
        get_braille().then((value: QuizItem[]) => {
          this.question_queue = new QuestionQueue(value);
        });
      } else if (this.trainer === "Korean") {
        this.question_queue = null;
        get_korean().then((value: QuizItem[]) => {
          this.question_queue = new QuestionQueue(value);
        });
      } else if (this.trainer === "Cyrillic") {
        this.question_queue = null;
        get_cyrillic().then((value: QuizItem[]) => {
          this.question_queue = new QuestionQueue(value);
        });
      } else {
        throw "Unknown trainer " + this.trainer;
      }
    },
  },
  computed: {
    next_questions(): Array<QuizItem> {
      if (this.question_queue === null) {
        return [];
      }
      let result = [];
      for (let i = this.peekCount - 1; i >= 0; i -= 1) {
        result.push(this.question_queue.peek(i));
      }
      return result;
    },
  },
});
</script>
