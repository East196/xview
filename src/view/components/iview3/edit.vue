<template>

  <Drawer title="修改用户" :closable="false" v-model="showEdit">
    <Row type="flex" justify="center" align="middle">
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
            <Button @click="edit()">修改</Button>
            <Button @click="reset()">重置</Button>
            <Button @click="cancel()">取消</Button>
          </ButtonGroup>
          {{showEdit}}
        </FormItem>
      </Form>
    </Row>

  </Drawer>

</template>
<script>
export default {
  name: 'Edit',
  props: {
    'showEdit': Boolean,
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
    edit() {
      console.log(this.people);
      this.$http.put(this.people._links.self.href, this.people).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        this.$emit('ok-edit', true)
        this.$emit('show-edit', false)
      }, function(response) {
        // 发生错误
      })
    },
    reset() {
      this.people = {_links:this.people._links}
    },
    cancel() {
      this.$emit('show-edit', false)
    },
  }
}
</script>
