import Vue from 'vue'

import quizbox from '@/components/quizbox.vue'
import menubar from '@/components/menubar.vue'


export default Vue.extend({
    name: "App",
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