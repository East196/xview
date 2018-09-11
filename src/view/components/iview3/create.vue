<template>
<Drawer title="添加用户" :closable="false" v-model="showCreate">
  <Row type="flex" justify="center" align="middle">
    <Form ref="person" :model="person" :rules="rules" inline>
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
          <Button @click="add('person')">新增</Button>
          <Button @click="reset('person')">重置</Button>
          <Button @click="cancel()">取消</Button>
        </ButtonGroup>
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
      person: {},
      sexs: [{
        value: 'male',
        label: '男'
      }, {
        value: 'female',
        label: '女'
      }],
      rules: {
        lastName: [{
          required: true,
          message: '姓 必须输入',
          trigger: 'blur'
        }],
        firstName: [{
          required: true,
          message: '名 必须输入',
          trigger: 'blur'
        }],
        age: [{
            required: true,
            message: '年龄 必须输入',
            trigger: 'blur'
          }
        ],
        sex: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }]
      }
    }
  },

  methods: {
    add(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8090/persons', this.person).then(function(response) {
            // response.data中获取ResponseData实体
            console.log(response.data)
            this.$emit('ok-create', true)
            this.$emit('show-create', false)
            this.$Message.success('Success!');
          }, function(response) {
            // 发生错误
            console.log(response.data)
            this.$Message.error('web Fail!');
          })

        } else {
          this.$Message.error('Fail!');
        }
      })

    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    cancel() {
      this.$emit('show-create', false)
    },
  }
}
</script>
