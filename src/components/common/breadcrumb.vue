<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="(item,index) in location" :key="index" :href="item.href">{{item.label}}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    export default {
      props: ['location']
    }
</script>