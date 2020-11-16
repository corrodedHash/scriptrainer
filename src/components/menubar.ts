import Vue from 'vue'
import dropdown from '@/components/dropdown.vue'

export default Vue.extend({
    components: {
        dropdown
    }, methods: {
        handleTrainerSelect(name: string) {
            this.$emit('selectionMade', name)
        }
    }
})