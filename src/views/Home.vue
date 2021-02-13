<template>
    <h1>Home {{page}}</h1>
    <h1>{{$t('hello')}}</h1>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue
{
    page = 'PAGE';
    mounted() {
        // const $t = this.$t.bind(this)
        // @ts-ignor
        // console.log(this.$t);
    }
}
</script>