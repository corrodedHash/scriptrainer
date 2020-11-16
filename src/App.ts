import Vue from 'vue'

import { QuizItem, QuizCharacterState } from "./quiz_item"
import get_braille from "./braille_quiz"
import get_cyrillic from './cyrillic_quiz'
import get_korean from "./korean_quiz"
import menubar from "./components/menubar.vue"
import question_section from "./components/question_section.vue"

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class QuestionQueue {
    private _items: Array<QuizItem>;
    private _queue: Array<number>
    constructor(items: Array<QuizItem>) {
        this._items = items;
        this._queue = Array<number>()
        for (let i = 0; i <= 4; i += 1) {
            this._queue.push(getRndInteger(0, this._items.length))
        }
    }
    get current() {
        return this._items[this._queue[0]]
    }
    peek(index: number) {
        return this._items[this._queue[index + 1]]
    }
    pop() {
        const next_number = this._queue[1]
        this._queue.shift()
        this._queue.push(getRndInteger(0, this._items.length))
        console.assert(next_number === this._queue[0])
    }
}

export default Vue.extend({
    name: "App",
    components: {
        menubar, question_section
    },
    props: {
        peekCount: { type: Number, default: 3 }
    },
    data() {
        return {
            question_queue: new QuestionQueue([]),
            initialized: false,
        }
    },
    methods: {
        handleSolve() {
            this.question_queue.pop()
        },
        selectTrainer(trainer: string) {
            if (trainer === "Braille") {
                this.question_queue = new QuestionQueue(get_braille())
            } else if (trainer === "Korean") {
                this.question_queue = new QuestionQueue(get_korean())
            } else if (trainer === "Cyrillic") {
                this.question_queue = new QuestionQueue(get_cyrillic())
            } else {
                throw "Unknown trainer"
            }
        },
        peekExpectedAnswer(index: number): string {
            if (index > this.peekCount) {
                throw "Peek index higher than count"
            }

            return this.question_queue.peek(this.peekCount - index).expectedAnswers.join(', ')
        }
    },
    created() {
        this.question_queue = new QuestionQueue(get_braille())
        this.initialized = true;
    },
})