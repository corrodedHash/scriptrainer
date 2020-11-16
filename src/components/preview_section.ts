import { QuizCharacterState, QuizItem } from '@/quiz_item'
import Vue from 'vue'
export default Vue.extend({
    name: "preview_section",
    props: {
        quizItems: { type: Array, required: true }
    }
})