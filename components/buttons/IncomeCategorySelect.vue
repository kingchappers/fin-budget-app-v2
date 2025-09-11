<!-- Vue component -->
<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: { Multiselect },
    data () {
      return {
        value: null,
        options: ['Gift', 'Job', 'Other', 'Refund', 'Rent', 'Side Project', 'Tax Refund']
      }
    }
  }
</script>

<template>
  <div>
    <multiselect v-model="value" :options="options"></multiselect>
  </div>
</template>

<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>