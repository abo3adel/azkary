<template>
    <div class="absolute top-0 flex w-full h-full">
        <div class="m-auto">
            <div class="flex flex-col text-center">
                <div class="mx-4 font-semibold break-all">
                    {{ sebha.body }}
                </div>
                <div>
                    <span class="text-6xl">{{ sebha.current }}</span>
                    <span class="text-3xl"> /{{ sebha.max }} </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Sebha } from '@/entities/Sebha'
export default {
    name: 'SebhaMeta',
    props: {
        sebha: {type: Sebha, required: true},
    }
}
</script>
