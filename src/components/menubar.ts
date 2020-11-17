import { defineComponent } from 'vue'
import dropdown from '@/components/dropdown.vue'

export default defineComponent({
    components: {
        dropdown
    }, methods: {
        handleTrainerSelect(name: string) {
            this.$emit('selectionMade', name)
        }
    }
})