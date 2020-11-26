<template>
  <div id="question_section">
    <div id="main_question" class="question question-tooltip">
      <matching-letters v-bind:statefulLetters="question_states" />
      <span class="question-tooltiptext">{{ expectedAnswer }}</span>
    </div>
    <input
      id="userinput"
      type="text"
      v-model="answer"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck="false"
      autofocus
      v-bind:class="{ incorrect: answerIncorrect }"
      aria-label="Enter latin characters in here!"
      placeholder="AaBb..."
    />
  </div>
</template>

<script lang="ts" src="./question_section.ts" />
<style scoped src="./question_section.css" />
