import QuizItem from '@/quiz_item'

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class QuestionQueue {
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