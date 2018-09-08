<template>

  <Drawer title="查看用户详情" :closable="false" v-model="showDetail">
    <Row type="flex" justify="center" align="middle">
      <Form ref="people" :model="people" inline>
        <FormItem label="名">
          <Input v-model="people.firstName" disabled placeholder="请输入 名" clearable style="width: 200px"></Input>
        </FormItem>
        <FormItem label="姓">
          <Input v-model="people.lastName" disabled placeholder="请输入 姓" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="people.age" disabled placeholder="请输入 年龄" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="people.sex" disabled style="width:200px">
            <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>

        <FormItem label="">
          <ButtonGroup>
            <Button @click="cancel()">取消</Button>
          </ButtonGroup>
          {{showDetail}}
        </FormItem>
      </Form>
    </Row>

  </Drawer>

</template>
<script>
export default {
  name: 'Detail',
  props: {
    'showDetail': Boolean,
    'people': Object
  },
  data() {
    return {
      sexs: [{
        value: 'male',
        label: '男'
      }, {
        value: 'female',
        label: '女'
      }],
    }
  },

  methods: {
    cancel() {
      this.$emit('show-detail', false)
    },
  }
}
</script>
