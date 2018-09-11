<template>

  <Drawer title="查看用户详情" :closable="false" v-model="showDetail">
    <Row type="flex" justify="center" align="middle">
      <Form ref="person" :model="person" inline>
        <FormItem label="名" prop="firstName">
          <Input v-model="person.firstName" placeholder="请输入 名" clearable style="width: 200px"></Input>
        </FormItem>
        <FormItem label="姓" prop="lastName">
          <Input v-model="person.lastName" placeholder="请输入 姓" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input v-model="person.age" placeholder="请输入 年龄" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <Select v-model="person.sex" style="width:200px">
            <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>

        <FormItem label="">
          <ButtonGroup>
            <Button @click="cancel()">取消</Button>
          </ButtonGroup>
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
    'person': Object
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
