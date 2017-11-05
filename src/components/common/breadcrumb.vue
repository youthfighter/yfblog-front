<template>
    <Breadcrumb :a="JSON.stringify(location[0])" :c="location.lable">
        <BreadcrumbItem v-for="(item,index) in location" :key="index" :href="item.href">{{item.label}}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
    export default {
      props: ['location']
    }
</script>