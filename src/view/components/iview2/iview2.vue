<template>
<div>
  <Row :gutter="14">
    <i-col span="8">
      <Card>
        <p slot="title">
          <Icon type="waterdrop"></Icon>
          iview inline form
        </p>
        <Row type="flex" justify="center" align="middle" class="countto-page-row">
          <Form ref="formInline" :model="formInline" inline>
            <FormItem label="用户">
              <Input v-model="formInline.user" placeholder="Enter something..." clearable style="width: 200px"></Input>
            </FormItem>
            <FormItem label="密码">
              <Input v-model="formInline.pass" type="password" placeholder="Enter something..." style="width: 200px"></Input>
            </FormItem>

            <FormItem label="城市">
              <Select v-model="formInline.city" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="颜色">
              <ColorPicker v-model="color3" alpha />
            </FormItem>

            <FormItem label="时间区间">
              <DatePicker :value="daterange" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>

            <FormItem label="时间">
              <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
          </Form>
        </Row>
      </Card>
    </i-col>
    <i-col span="8">
      <Card>
        <p slot="title">
          <Icon type="waterdrop"></Icon>
          iview form
        </p>
        <Row type="flex" justify="center" align="middle" class="countto-page-row">

          <Form :model="formItem" :label-width="80">
            <FormItem label="社交网络">
              <CheckboxGroup v-model="formItem.social">
                <Checkbox label="twitter">
                  <Icon type="social-twitter"></Icon>
                  <span>Twitter</span>
                </Checkbox>
                <Checkbox label="facebook">
                  <Icon type="social-facebook"></Icon>
                  <span>Facebook</span>
                </Checkbox>
                <Checkbox label="github">
                  <Icon type="social-github"></Icon>
                  <span>Github</span>
                </Checkbox>
                <Checkbox label="snapchat">
                  <Icon type="social-snapchat"></Icon>
                  <span>Snapchat</span>
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="水果">
              <CheckboxGroup v-model="formItem.fruit">
                <Checkbox label="香蕉"></Checkbox>
                <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="是否">
              <i-switch>
                <Icon type="md-checkmark" slot="open"></Icon>
                <Icon type="md-close" slot="close"></Icon>
              </i-switch>

            </FormItem>
          </Form>
        </Row>
      </Card>
    </i-col>
    <i-col span="8">
      <Card>
        <Row type="flex" justify="center" align="middle" class="countto-page-row">
          <RadioGroup v-model="buttonSize" type="button">
            <Radio label="large">Large</Radio>
            <Radio label="default">Default</Radio>
            <Radio label="small">small</Radio>
          </RadioGroup>

          <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
          <Button :size="buttonSize" icon="ios-download-outline" type="primary">Download</Button>
        </Row>
      </Card>
    </i-col>
  </Row>
  <br>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row>
          <ButtonGroup>
            <Button :size="buttonSize" icon="md-search" type="info">查询</Button>
            <Button :size="buttonSize" icon="md-add" type="primary">新增</Button>
            <Button :size="buttonSize" icon="md-create" type="success">修改</Button>
            <Button :size="buttonSize" icon="md-remove" type="error">删除</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button @click="handleSelectAll(true)">全选</Button>
            <Button @click="handleSelectAll(false)">全不选</Button>
          </ButtonGroup>
        </Row>
        <br>
        <Row>
          <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        </Row>
        <br>
        <Row>
          <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </Row>
      </Card>
    </i-col>
  </Row>

</div>
</template>

<script>
export default {
  name: 'iview2',
  components: {},
  data () {
    return {
      formInline: {
        user: '',
        pass: '',
        city: ''
      },
      formItem: {
        social: ['facebook', 'github'],
        fruit: ['苹果']
      },
      cityList: [{
        value: 'New York',
        label: 'New York'
      },
      {
        value: 'London',
        label: 'London'
      },
      {
        value: 'Sydney',
        label: 'Sydney'
      },
      {
        value: 'Ottawa',
        label: 'Ottawa'
      },
      {
        value: 'Paris',
        label: 'Paris'
      },
      {
        value: 'Canberra',
        label: 'Canberra'
      }
      ],
      color3: '#19be6b',
      daterange: ['2018-01-01', '2018-02-15'],
      switch1: true,
      columns4: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age'
      },
      {
        title: 'Address',
        key: 'address'
      }
      ],
      data1: [{
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      },
      {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      },
      {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      },
      {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }
      ]
    }
  },
  methods: {
    init () {

    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
@baseColor: ~"#dc9387";
</style>
