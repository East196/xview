<template>
<Form ref="formValidate" :model="formValidate" inline :label-width="80">
  <FormItem label="姓" prop="lastName" @on-form-change="handleSubmit('formValidate')">
    <Input v-model="formValidate.lastName.like" placeholder="Enter your lastName" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="名" prop="firstName" @on-form-change="handleSubmit('formValidate')">
    <Input v-model="formValidate.firstName.like" placeholder="Enter your firstName" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="年龄" prop="age" @on-form-change="handleSubmit('formValidate')">
    <Input v-model="formValidate.age.eq" placeholder="Enter your age" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="性别" prop="sex" @on-form-change="handleSubmit('formValidate')" style="width: 200px">
    <RadioGroup v-model="formValidate.sex.eq">
      <Radio label="male">男</Radio>
      <Radio label="female">女</Radio>
    </RadioGroup>
  </FormItem>
  <FormItem>
    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
  </FormItem>
</Form>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        lastName: {
          like: ""
        },
        firstName: {
          like: ""
        },
        age: {
          eq: ""
        },
        sex: {
          eq: ""
        },
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.formValidate));
          this.$emit("ok-search",this.formValidate)
          this.$Message.success('好好好!');
        } else {
          this.$Message.error('哎~呀~!');
        }
      })
    },
    handleReset(name) {
      this.formValidate = {
        lastName: {
          like: ""
        },
        firstName: {
          like: ""
        },
        age: {
          eq: ""
        },
        sex: {
          eq: ""
        },
      }
    }
  }
}
</script>
