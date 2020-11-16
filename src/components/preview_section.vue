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

<script lang="ts" src="./preview_section.ts" />
<style scoped src="./preview_section.css" />
