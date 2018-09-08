export default [
  {
    name: '__sequence',   // <----
    title: '#',
    titleClass: 'center aligned',
    dataClass: 'right aligned'
  },
  'name', 'email',
{
  name: 'birthdate',
  title: '生日',
  sortField: 'birthdate',
  titleClass: 'center aligned',
  dataClass: 'center aligned'
},
{
  name: 'nickname',
  sortField: 'nickname',
  direction: 'asc',
  callback: function (value) {
    return value.toUpperCase()
  }
},
{
  name: 'gender',
  titleClass: 'center aligned',
  dataClass: 'center aligned',
  callback: function genderLabel (value) {
    return value === 'M'
      ? '<span class="ui teal label"><i class="large man icon"></i>男</span>'
      : '<span class="ui pink label"><i class="large woman icon"></i>女</span>'
  }
},
{
  name: 'salary',
  titleClass: 'center aligned',
  dataClass: 'right aligned'
},
{
  name: '__component:custom-actions',   // <----
  title: 'Actions',
  titleClass: 'center aligned',
  dataClass: 'center aligned'
},
]
