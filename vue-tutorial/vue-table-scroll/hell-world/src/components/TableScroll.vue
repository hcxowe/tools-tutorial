<template>
    <div class="dg">
        <div class="dg-head-wrapper">
            <table>
                <thead>
                    <tr>
                        <td colspan="4">1</td>
                        <td colspan="5">1</td>
                        <td colspan="5">1</td>
                        <td colspan="5">1</td>
                        <td colspan="5">1</td>
                    </tr>
                </thead>
            </table>
        </div>

        <div class="dg-body-wrapper">
            <table>
                <tbody>
                    <tr v-for="(item, index) in tableList" :key="item.id">
                        <td colspan="4">{{ index }}</td>
                        <td colspan="5">{{ item.id }}</td>
                        <td colspan="5">{{ item.name }}</td>
                        <td colspan="5">{{ item.age }}</td>
                        <td colspan="5">{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
        tableList () {
            var list = []
            for(var i=0; i<100; i++) {
                list.push({
                    id: i,
                    name: 'hcxowe',
                    age: 29,
                    desc: 'this is a description.'
                })
            }

            return list
        }
    }
}
</script>

<style scoped>
    div {
        color: red;
    }

    table {
        width: 100%;
        table-layout: fixed;
    }

    td {
        width: 4.16666%;
        vertical-align: middle;
        text-align: center;
    }

    .dg {
        position: relative;
        width: 500px;
        height: 600px;
    }

    .dg-head-wrapper {
        position: absolute;
        top:0;left: 0;right: 0;height: 40px;
        background: #ccc;
        padding-right: 15px;
    }

    .dg-head-wrapper tr {
        height: 40px;
    }

    .dg-body-wrapper {
        position: absolute;
        top:40px; left: 0; right: 0;bottom: 0;
        background: #eee;
        overflow: auto;
        padding-right: 15px;
    }
</style>




