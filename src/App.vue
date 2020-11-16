<template>
  <div id="app" v-if="initialized">
    <menubar v-on:selectionMade="selectTrainer" />
    <div id="quizbox">
      <div id="next_questions_box">
        <div v-for="questionId in 3" class="question question-tooltip">
          {{ question_queue.peek(3 - questionId).rawQuestion }}
          <span class="question-tooltiptext">{{
            peekExpectedAnswer(questionId)
          }}</span>
        </div>
      </div>
      <question_section v-bind:quizItem="question_queue.current" v-on:solved="handleSolve" />
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style src="./App.css" scoped />
