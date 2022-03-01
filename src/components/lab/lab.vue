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
    :data="labList.slice((pageNum-1)*pageSize,pageNum*pageSize)"
    border
    style="width: 100%">
        <el-table-column
        prop="labName"
        label="实验室"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacherName"
        label="负责教师"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="comment"
        label="简介"
        align="center">
        </el-table-column>
        <el-table-column
        prop="benchNums"
        label="实验台数量"
        align="center">
        </el-table-column>

    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="1"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
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
            // 分页相关参数
            // 当前页码，默认为第一页
            pageNum:1,
            // 一页默认5条信息
            pageSize:5,
            // 显示数据总数
            total:0,
            // 实验室数据列表, 从数据库获取渲染
            labList:[],
        }
    },
    methods:{
        //  axios获取后台数据函数
        getLabList(){
            this.$http.get(`lab/list`)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('获取实验室信息失败');
                }else{
                    this.$message.success('获取实验室信息成功');
                     this.labList = res.data.data;
                     this.total = parseInt(res.data.data.length);
                }
            })

        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            this.pageSize =newSize;
            this.getLabList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            this.pageNum = newNum;
            this.getLabList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getTeacherList();
        }

    },
    // 点击实验室详情就发起请求渲染表格
    created(){
        this.getLabList();
    }
}
</script>

<style>

</style>