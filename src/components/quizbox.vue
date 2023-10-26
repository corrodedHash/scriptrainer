<template>
  <div id="quizbox">
    <preview_section v-bind:quizItems="next_questions" v-if="question_queue !== null" />
    <question_section
      :quizItem="question_queue.current"
      @solved="question_queue.pop()"
      v-if="question_queue !== null"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, type Ref } from 'vue'

import QuizItem from '@/quiz_item'
import get_braille from '@/quiz/braille_quiz'
import get_cyrillic from '@/quiz/cyrillic_quiz'
import get_korean from '@/quiz/korean_quiz'
import get_myanmar from '@/quiz/myanmar_quiz'
import question_section from '@/components/question_section.vue'
import preview_section from '@/components/preview_section.vue'
import QuestionQueue from '@/quiz_queue'

const props = withDefaults(defineProps<{ peekCount?: number; trainer: string }>(), { peekCount: 3 })
const question_queue: Ref<QuestionQueue | null> = ref(null)
onMounted(() => {
  get_braille().then((value: QuizItem[]) => {
    question_queue.value = new QuestionQueue(value)
  })
})

watch(
  () => props.trainer,
  (t) => {
    const trainerMap: Record<string, () => Promise<QuizItem[]>> = {
      Braille: get_braille,
      Korean: get_korean,
      Cyrillic: get_cyrillic,
      Myanmar: get_myanmar
    }
    const chosenTrainer = trainerMap[t]
    if (chosenTrainer === undefined) throw 'Unknown trainer ' + t

    chosenTrainer().then((value) => {
      question_queue.value = new QuestionQueue(value)
    })
  }
)

const next_questions = computed(() => {
  if (question_queue.value === null) {
    return []
  }
  let result = []
  for (let i = props.peekCount - 1; i >= 0; i -= 1) {
    result.push(question_queue.value.peek(i))
  }
  return result
})
</script>
