<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实验室信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="labList"
    border
    style="width: 100%">
        <el-table-column
        prop="lab_id"
        label="实验室"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacehr_phone"
        label="负责教师"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="lab_comment"
        label="简介"
        align="center">
        </el-table-column>
        <el-table-column
        prop="lab_bench_nums"
        label="实验台数量"
        align="center">
        </el-table-column>

    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="1"
      :page-sizes="[1,2,3,4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
export default {
    data(){
        return{
            // query绑定搜索框
            // 请求实验室信息参数
            queryInfo:{
                query:'',
                pageNum:'1',
                pageSize:'2'
            },
            // 实验室数据列表, 这里暂时使用假数据，后续从数据库获取渲染
            labList:[
                {
                id:'1',
                lab_id:'001',
                lab_bench_nums: '16',
                lab_bench_id:['001','002'],
                lab_cou_id:'1',
                lab_comment:'001实验室坐落于xxx'
            },
            {
                 id:'21',
                lab_id:'0021',
                lab_bench_nums: '15',
                lab_bench_id:['001','002'],
                lab_cou_id:'2',
                lab_comment:'002实验室坐落于xxx'
            }
            ],
            // 当前数据总数
            total :2,

        }
    },
    methods:{
        //  axios获取后台数据函数
        getLabList(){

        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            // this.queryInfo.pageSize =newSize;
            // this.getTeacherList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // this.queryInfo.pageNum = newNum;
            // this.getTeacherList();
        },
        create(){
            this.getLabList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getTeacherList();
        }

    }
}
</script>

<style>

</style>