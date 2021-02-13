<template>
    <h1>asdsad</h1>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import db from '@/utils/db';
import { Category } from '@/entities/Category';

@Options({})
export default class ZikrIndex extends Vue
{
    mounted() {
        db().then(con => {
            const repo = con.getRepository(Category);
            repo.find().then(r => console.log(r));
        })
    }
}
</script>