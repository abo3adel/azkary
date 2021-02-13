<template>
    <h1>Home {{page}}</h1>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue
{
    page = 'PAGE';
}
</script>