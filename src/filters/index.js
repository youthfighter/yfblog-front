import moment from 'moment'
export default {
  formateDate (value, formate) {
    if (value) return moment(value).format(formate)
    else return value
  }
}
