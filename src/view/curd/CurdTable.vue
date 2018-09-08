<template>
<div>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row>
            <filter-bar></filter-bar>
            <vuetable ref="vuetable"
              api-url="https://vuetable.ratiw.net/api/users"
              :fields="fields"
              :append-params="moreParams"
              detail-row-component="my-detail-row"
              @vuetable:cell-clicked="onCellClicked"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
            ></vuetable>
        </Row>
        <Row>
          <div class="vuetable-pagination ui basic segment grid">
  <vuetable-pagination-info ref="paginationInfo"
  ></vuetable-pagination-info>
            <vuetable-pagination ref="pagination"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
          </div>
        </Row>

      </Card>
    </i-col>
  </Row>

</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import Vue from 'vue'
import FilterBar from './FilterBar'
import CustomActions from './CustomActions'
import DetailRow from './DetailRow'
Vue.component('filter-bar', FilterBar)
Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)

import VueEvents from 'vue-events'
Vue.use(VueEvents)
import FieldDefs from './FieldDefs.js'
export default {
  name: 'curd',
  components: {
    Vuetable, VuetablePagination, VuetablePaginationInfo
  },
  data () {
    return {
      fields: FieldDefs,
      moreParams: {}
    }

  },
  methods: {
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onFilterSet (filterText) {
        this.moreParams = {
            'filter': filterText
        }
        Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    onFilterReset () {
        this.moreParams = {}
        Vue.nextTick( () => this.$refs.vuetable.refresh())
    }

  },
  mounted() {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
  }
}
</script>
