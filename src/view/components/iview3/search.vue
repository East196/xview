<template>
<Form ref="search" :model="search" inline :label-width="80">
  <FormItem label="姓" prop="lastName" @on-form-change="handleSubmit('search')">
    <Input v-model="search.lastName.like" placeholder="模糊查询" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="名" prop="firstName" @on-form-change="handleSubmit('search')">
    <Input v-model="search.firstName.like" placeholder="模糊查询" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="年龄" prop="age" @on-form-change="handleSubmit('search')">
    <Input v-model="search.age.eq" placeholder="精确匹配" style="width: 200px"></Input>
  </FormItem>
  <FormItem label="性别" prop="sex" @on-form-change="handleSubmit('search')" style="width: 200px">
    <RadioGroup v-model="search.sex.eq">
      <Radio label="male">男</Radio>
      <Radio label="female">女</Radio>
    </RadioGroup>
  </FormItem>
  <FormItem>
    <Button type="info" @click="handleReset('search')" >重置</Button>
  </FormItem>
</Form>
</template>
<script>
export default {
  name: 'Search',
  props: {
    'search': Object
  },
  data() {
    return {

    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.search));
          this.$emit("ok-search","search")
          this.$Message.success('好好好!');
        } else {
          this.$Message.error('哎~呀~!');
        }
      })
    },
    handleReset(name) {
      this.$emit("on-reset","search")
    }
  }
}
</script>
