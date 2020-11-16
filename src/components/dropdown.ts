import Vue from 'vue'
export default Vue.extend({
    props: {
        optionnames: { type: Array, required: true },
    },
    methods: {
        clickHandler(name: string) {
            this.$emit('selectionMade', name)
        }
    }
})