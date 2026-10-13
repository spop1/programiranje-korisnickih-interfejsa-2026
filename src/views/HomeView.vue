<script setup lang="ts">
import { QuestionService } from '@/assets/services/question.service';
import { ref } from 'vue';



const question = ref<any[]>()

QuestionService.getAll()
.then(rsp=>question.value = rsp)
</script>

<template>
  
<ul>
  <li v-for="q in question" :class="q.questionId % 2 === 0 ? 'yellow' : 'blue'"
  >{{ q.questionId }} - {{ q.text }}</li>
</ul>
<pre>{{ question }}</pre>
</template>

<style>
.yellow{
  color: yellow;
}
.blue{
  color:blue;
}
</style>
