<template>
<div>
  <Row :gutter="14">
    <i-col span="24">
      <Card>
        <Row>
          <vuetable ref="vuetable"
            api-url="https://vuetable.ratiw.net/api/users"
            :fields="['name', 'email', 'birthdate', 'address.line1', 'address.line2', 'address.zipcode']"
          ></vuetable>
        </Row>
      </Card>
    </i-col>
  </Row>

</div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
export default {
  name: 'curd',
  components: {
    Vuetable
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
