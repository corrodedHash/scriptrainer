<template>
  <div id="next_questions_box">
    <div
      v-for="index in quizItems.length"
      class="question question-tooltip"
      v-bind:key="index"
    >
      {{ quizItems[index - 1].rawQuestion }}
      <span class="question-tooltiptext">{{
        quizItems[index - 1].expectedAnswers.join(",")
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "preview_section",
  props: {
    quizItems: { type: Array, required: true },
  },
});
</script>
<style scoped>
.question-tooltip {
  position: relative;
  display: flex;
  flex-direction: column;
}

.question-tooltip .question-tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.question-tooltiptext {
  font-size: medium;
  height: 60%;
  font-weight: normal;
  padding: 5px 20px;
  margin-left: 7px;
}

.question-tooltip:hover .question-tooltiptext {
  visibility: visible;
}

#next_questions_box {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 2px solid #73ad21;
  background-color: aliceblue;
}

.question {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: xx-large;
  color: lightgrey;
}
</style>
