<template>
  <div class="index">
    <Row :gutter="16">
      <Col span="8">
        <appToDo></appToDo>
      </Col>
    </Row>
  </div>       
</template>
<script>
import appToDo from '@/components/management/todo'
export default {
  components: {
    appToDo
  }
}
</script>
<style scoped>
.app-breadcrumb{
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>