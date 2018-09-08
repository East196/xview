<template>
<div>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row>
          <ButtonGroup>
            <Button :size="buttonSize" icon="md-search" type="info">查询</Button>
            <Button :size="buttonSize" @click="create()" icon="md-add" type="primary">新增</Button>
            <Button :size="buttonSize" @click="edit()" icon="md-create" type="success">修改</Button>
            <Button :size="buttonSize" @click="deleteAll()" icon="md-remove" type="error">删除</Button>
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
        <Create v-bind:show-create="showCreate" v-on:ok-create="showAll($event)" v-on:show-create="showCreate=$event"></Create>
        <Edit v-bind:people="people" v-bind:show-edit="showEdit" v-on:ok-edit="showAll($event)" v-on:show-edit="showEdit=$event"></Edit>
      </Card>
    </i-col>
  </Row>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        {{showCreate}}
        {{showEdit}}
        {{people}}
      </Card>
    </i-col>
  </Row>
</div>
</template>

<script>
import axios from '@/libs/api.request'
import Create from './create.vue'
import Edit from './edit.vue'
export default {
  name: 'iviewtable',
  components: {
    Create,
    Edit
  },
  data() {
    return {


      showEdit: false,
      people: {},

      showCreate: false,
      columns4: [{
          type: 'selection',
          width: 50,
          fixed: 'left',
          align: 'center'
        },
        {
          title: 'Name',
          key: 'firstName',
          width: 200
        },
        {
          title: 'Age',
          key: 'age',
          sortable: true
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: 'Action',
          key: 'action',
          width: 120,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  icon: "md-eye",
                  shape: "circle"
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'primary',
                  icon: "md-add",
                  size: 'small',
                  shape: "circle"
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: "md-trash",
                  shape: "circle"
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              })
            ]);
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    showAll(status) {
      this.$http.get('http://localhost:8090/people', {}).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        console.log(response.data._embedded.people)
        this.data1 = response.data._embedded.people
      }, function(response) {
        // 发生错误
      })
    },
    create(index) {
      console.log(index);
      this.showCreate = true
    },
    edit(index) {
      console.log(index);
      this.people = this.data1[parseInt(index)]
      console.log(this.people);
      this.showEdit = true
    },
    remove(index) {
      console.log(index);
      var item = this.data1[parseInt(index)]
      console.log(item);
      this.$http.delete(item._links.self.href, {}).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        this.data1.splice(index, 1)
      }, function(response) {
        // 发生错误
      })
    },
    deleteAll() {
      console.log("deleteAll");
    }
  },
  mounted() {
    this.showAll(true)
  }
}
</script>

<style lang="less">
@baseColor: ~"#dc9387";
</style>
