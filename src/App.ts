import { defineComponent } from 'vue'

import quizbox from '@/components/quizbox.vue'
import menubar from '@/components/menubar.vue'


export default defineComponent({
    components: {
        menubar, quizbox
    },
    props: {
        peekCount: { type: Number, default: 3 }
    },
    data() {
        return {
            trainer: "Braille"
        }
    },
    methods: {
        selectTrainer(trainer: string) {
            this.trainer = trainer
        }
    },
})