<template>
    <div class="w-1/2 mx-auto">
        <img
            src="/assets/slides/icon.svg"
            width="20"
            height="20"
            class="icon animate-pulse"
        />
    </div>
    <h1 class="mt-3 text-5xl">{{ $t('app.slideName') }}</h1>
</template>
<script>
    export default {
        name: 'FirstSlide',
    };
</script>
