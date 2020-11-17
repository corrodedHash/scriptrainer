import { QuizCharacterState, QuizItem } from '@/quiz_item'
import { defineComponent } from 'vue'
export default defineComponent({
    name: "preview_section",
    props: {
        quizItems: { type: Array, required: true }
    }
})