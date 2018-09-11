<template>
<div style="margin-right:20px;">
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row :gutter="14">
              <Search @ok-search="handleSearch"></Search>
        </Row>
        <Row>
          <ButtonGroup>
            <Button icon="md-search" type="info">查询</Button>
            <Button @click="create()" icon="md-add" type="primary">新增</Button>
            <Button @click="editSelected()" icon="md-create" type="success">修改</Button>
            <Button @click="removeSelected()" icon="md-remove" type="error">删除</Button>
          </ButtonGroup>
        </Row>
        <br>
        <Row>
          <Table border ref="selection" :columns="columns" :data="data" @on-selection-change="handleSelectionChange" @on-sort-change="handleSortChange"></Table>
        </Row>
        <br>
        <Row>
          <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </Row>
        <Create :show-create="showCreate" v-on:ok-create="showAll()" v-on:show-create="showCreate=$event"></Create>
        <Edit :people="people" :show-edit="showEdit" v-on:ok-edit="showAll()" v-on:show-edit="showEdit=$event"></Edit>
        <Detail :people="people" :show-detail="showDetail" v-on:show-detail="showDetail=$event"></Detail>
      </Card>
    </i-col>
  </Row>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        {{showCreate}} {{showEdit}} {{showDetail}}
        <br> {{people}} {{selection}}
        <br> {{page}} {{pageSize}} {{pageNum}} {{pageTotal}} {{sort}}
      </Card>
    </i-col>
  </Row>
</div>
</template>

<script>
import reject from 'lodash/reject'
import Create from './create.vue'
import Edit from './edit.vue'
import Detail from './detail.vue'
import Search from './search.vue'


export default {
  name: 'iviewtable',
  components: {
    Create,
    Edit,
    Detail,
    Search
  },
  data() {
    return {
      selection: [],

      pageSize: 10,
      pageNum: 1,
      pageTotal: 0,

      sort: 'age,desc',

      page: {},

      showDetail: false,
      showEdit: false,
      people: {},

      showCreate: false,
      columns: [{
          type: 'selection',
          width: 50,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '姓',
          key: 'lastName',
          width: 200
        },
        {
          title: '名',
          key: 'firstName',
          width: 200
        },
        {
          title: '年龄',
          key: 'age',
          sortable: "custom"
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '操作',
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
                  icon: "md-create",
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
      data: []
    }
  },
  methods: {
    handleSearch(value) {
      console.log(value);
      var params = '?page=' + (this.pageNum - 1).toString() + '&size=' + this.pageSize + '&sort=' + this.sort
      this.$http.post('http://localhost:8090/people/show' + params, value).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        console.log(response.data.data)
        console.log(response.data.page)
        this.page = response.data.page
        this.pageSize = this.page.size
        this.pageNum = this.page.number + 1
        this.pageTotal = this.page.totalElements

        this.data = response.data.data

      }, function(response) {
        // 发生错误
      })
    },
    handlePage(value) {
      this.pageNum = value
      this.showAll()
    },
    handlePageSize(value) {
      this.pageSize = value
      this.showAll()
    },
    handleSortChange(value) {
      console.log(value);
      this.sort = value.key + "," + value.order
      this.showAll()
    },
    handleSelectionChange(value) {
      console.log(value);
      this.selection = value
    },
    showAll() {
      var params = '?page=' + (this.pageNum - 1).toString() + '&size=' + this.pageSize + '&sort=' + this.sort
      this.$http.get('http://localhost:8090/people' + params, {}).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        console.log(response.data.content)
        console.log(response.data.page)
        this.page = response.data.page
        this.pageSize = this.page.size
        this.pageNum = this.page.number + 1
        this.pageTotal = this.page.totalElements

        this.data = response.data.content

      }, function(response) {
        // 发生错误
      })
    },
    create(index) {
      console.log(index);
      this.showCreate = true
    },
    show(index) {
      console.log(index);
      this.people = this.data[parseInt(index)]
      console.log(this.people);
      this.showDetail = true
    },
    edit(index) {
      console.log(index);
      this.people = this.data[parseInt(index)]
      console.log(this.people);
      this.showEdit = true
    },
    remove(index) {
      console.log(index);
      var item = this.data[parseInt(index)]
      console.log(item);
      this.$http.delete(item.links[0].href, {}).then(function(response) {
        // response.data中获取ResponseData实体
        console.log(response.data)
        this.data.splice(index, 1)
      }, function(response) {
        // 发生错误
      })
    },
    editSelected() {
      console.log("editSelected", this.selection.length);
      if (this.selection.length == 1) {
        this.people = this.selection[0]
        console.log(this.people);
        this.showEdit = true
      }else{
        this.$Message.error('只有选中一条记录的时候才能修改!');
      }
    },
    removeSelected() {
      console.log("removeSelected", this.selection.length);
      this.selection.forEach((item) => {
        console.log(item);
        this.data = reject(this.data, { 'id': item["id"] });
        this.$http.delete(item.links[0].href, {}).then(function(response) {
          // response.data中获取ResponseData实体
          console.log("deleted!", response.data)

        }, function(response) {
          // 发生错误
        })
      })
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
