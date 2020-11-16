<template>
  <div id="question_section">
    <div id="main_question" class="question question-tooltip">
      <span
        v-for="tuple in letterStates"
        v-bind:class="tuple[1]"
        >{{tuple[0] }}</span
      >
      <span class="question-tooltiptext">{{ expectedAnswer }}</span>
    </div>
    <input
      id="userinput"
      v-model="answer"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      autofocus
      v-bind:class="{ incorrect: answerIncorrect }"
    />
  </div>
</template>

<script lang="ts" src="./question_section.ts" />
<style scoped src="./question_section.css" />
