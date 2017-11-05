<template>
    <Alert :type="type" show-icon>
        {{ title }}
        <span slot="desc">{{desc}}</span>
    </Alert>
</template>
<script>
    export default {
      props: ['type', 'title', 'desc']
    }
</script>