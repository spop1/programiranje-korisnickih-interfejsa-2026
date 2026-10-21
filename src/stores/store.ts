import { reactive, ref } from "vue";

export type SearchKriterijum = 'name' | 'care' | 'target'

export const globalSearch = reactive({
    name: '',
    text: '',
    searchType: 'name' as SearchKriterijum,
    selectedCategories: [] as string[],
    plantAge: 'all',
    selectedTargetGroups: [] as string[]
})


