<template>

  <Drawer title="添加用户" :closable="false" v-model="showCreate">
    <Row type="flex" justify="center" align="middle" class="countto-page-row">
      <Form ref="people" :model="people" inline>
        <FormItem label="名">
          <Input v-model="people.firstName" placeholder="请输入 名" clearable style="width: 200px"></Input>
        </FormItem>
        <FormItem label="姓">
          <Input v-model="people.lastName" placeholder="请输入 姓" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="people.age" placeholder="请输入 年龄" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="people.sex" style="width:200px">
            <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>

        <FormItem label="">
          <ButtonGroup>
            <Button @click="add()">新增</Button>
            <Button @click="reset()">重置</Button>
            <Button @click="cancel()">取消</Button>
          </ButtonGroup>
          {{showCreate}}
        </FormItem>
      </Form>
    </Row>

  </Drawer>

</template>
<script>
export default {
  name: 'Create',
  props: {
    'showCreate': Boolean,
  },
  data() {
    return {
      people: {},
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
    add() {
      this.$http.post('http://localhost:8090/people', this.people).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        this.$emit('ok-create', true)
        this.$emit('show-create', false)
      }, function(response) {
        // 发生错误
      })
    },
    reset() {
      this.people = {}
    },
    cancel() {
      this.$emit('show-create', false)
    },
  }
}
</script>
