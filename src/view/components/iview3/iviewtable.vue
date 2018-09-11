<template>
<div style="margin-right:20px;">
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row :gutter="14">
              <Search @ok-search="handleSearch" @on-reset="handleReset" :search="search"></Search>
        </Row>
        <Row>
          <Table border ref="selection" :columns="columns" :data="data" @on-selection-change="handleSelectionChange" @on-sort-change="handleSortChange"></Table>
        </Row>
        <br>
        <Row>
          <i-col span="16">
            <ButtonGroup>
              <Button @click="create()" icon="md-add" type="primary">新增</Button>
              <Button @click="editSelected()" icon="md-create" type="warning">修改</Button>
              <Button @click="removeSelected()" icon="md-remove" type="error">删除</Button>
            </ButtonGroup>
          </i-col>
          <i-col span="8" >
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
          </i-col>
        </Row>
        <Create :show-create="showCreate" v-on:ok-create="handleSearch()" v-on:show-create="showCreate=$event"></Create>
        <Edit :person="person" :show-edit="showEdit" v-on:ok-edit="handleSearch()" v-on:show-edit="showEdit=$event"></Edit>
        <Detail :person="person" :show-detail="showDetail" v-on:show-detail="showDetail=$event"></Detail>
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
      search: {
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
      },
      selection: [],

      pageSize: 10,
      pageNum: 1,
      pageTotal: 0,

      sort: 'age,desc',

      page: {},

      showDetail: false,
      showEdit: false,
      person: {},

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
                  type: 'warning',
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
      this.$http.post('http://localhost:8090/persons/show' + params, this.search).then(function(response) {
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
    handleReset(name) {
      this.search = {
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
    },
    handlePage(value) {
      this.pageNum = value
      this.handleSearch()
    },
    handlePageSize(value) {
      this.pageSize = value
      this.handleSearch()
    },
    handleSortChange(value) {
      console.log(value);
      this.sort = value.key + "," + value.order
      this.handleSearch()
    },
    handleSelectionChange(value) {
      console.log(value);
      this.selection = value
    },
    create(index) {
      console.log(index);
      this.showCreate = true
    },
    show(index) {
      console.log(index);
      this.person = this.data[parseInt(index)]
      console.log(this.person);
      this.showDetail = true
    },
    edit(index) {
      console.log(index);
      this.person = this.data[parseInt(index)]
      console.log(this.person);
      this.showEdit = true
    },
    remove(index) {
      console.log(index);
      var item = this.data[parseInt(index)]
      console.log(item);
      this.$http.delete("http://localhost:8090/persons/"+item.id, {}).then(function(response) {
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
        this.person = this.selection[0]
        console.log(this.person);
        this.showEdit = true
      }else{
        this.$Message.error('只有选中一条记录的时候才能修改!');
      }
    },
    removeSelected() {
      console.log("removeSelected", this.selection.length);
      this.selection.forEach((item) => {
        console.log(item);
        // this.data = reject(this.data, { 'id': item["id"] });
        this.$http.delete("http://localhost:8090/persons/"+item.id, {}).then(function(response) {
          // response.data中获取ResponseData实体
          console.log("deleted!", response.data)

        }, function(response) {
          // 发生错误
        })
      })
    }
  },
  mounted() {
    this.handleSearch(true)
  }
}
</script>

<style lang="less">
@baseColor: ~"#dc9387";
</style>
