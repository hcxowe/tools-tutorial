import dialog2 from '@/components/dialog'
import dialog1 from '@/components/dialog1'
export default {
  data () {
    return {
      dialogFormVisible1: false,
      dialogFormVisible: true
    }
  },
  mounted() {
    console.log('xsdfsdf')
    /* this.$bus.on('opend', () => {
        this.dialogFormVisible1 = true;
    }); */
  },
  components: {
    dialog2,
    dialog1
  },
  methods: {
    openDialog1(value) {
    }
  }
}