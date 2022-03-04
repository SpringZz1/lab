<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实验桌操作</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索头部 -->
    <!-- 首先要先下拉选项选择查看哪个实验室信息 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="searchInput.labId" placeholder="请选择要查看的实验室" clearable @clear="getBenchList">
                    <el-option
                        v-for="lab in labList"
                        :key="lab.labId"
                        :label="lab.labName"
                        :value="lab.labId">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="1">
                <div>
                    <el-button type="primary" @click="searchLab">查找</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <el-button type="primary" @click="addBenchVisible = true">添加实验桌</el-button>
                </div>
            </el-col>

        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
        :data="benchList.slice((pageNum-1)*pageSize,pageNum*pageSize)"
        border
        style="width: 100%">
            <el-table-column
            prop="benchName"
            label="实验桌编号"
            align="center">
            </el-table-column>
            <el-table-column
            prop="comment"
            label="实验室备注"
            align="center">
            </el-table-column>
            <el-table-column
            prop="labName"
            label="所属实验室"
            align="center">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="修改信息" placement="top">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateBench(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delteBench(scope.row)"></el-button>
                        </el-tooltip>
                    </el-row>
                </template>
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

    <!-- 添加实验桌 -->
    <el-dialog
        title="添加实验桌子"
        :visible.sync="addBenchVisible"
        width="50%"
        >
        <!-- 内容区域 -->
            <el-row  style="margin-bottom:20px">
                <el-col :span="12">
                    <!-- 实验桌编号输入框输入 -->
                    <el-input v-model="addBenchList.benchName" placeholder="请输入实验桌编号" style="width:60%"></el-input>
                </el-col>
                <el-col :span="12">
                    <!-- 课程时间用输入框输入 -->
                    <el-input v-model="addBenchList.comment" placeholder="实验室简介" style="width:60%"></el-input>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <!-- 绑定实验室，使用下拉框选择，数据从后台获取 -->
                    <el-select v-model="addBenchList.labId" filterable placeholder="实验室" style="width:60%">
                        <el-option
                            v-for="lab in labList"
                            :key="lab.labId"
                            :label="lab.labName"
                            :value="lab.labId">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

        <span slot="footer" class="dialog-footer">
        <el-button @click="empty">取 消</el-button>
        <el-button type="primary" @click="addBench">确 定</el-button>
    </span>
    </el-dialog>

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
            // 获取实验桌信息
            benchList:[],
            // 存储所有的实验桌名和名字
            benches:[],
            // 搜索实验室信息存储
            searchInput:{
                labId:'',
                labName:''
            },
            addBenchVisible: false,
            // 保存实验室id和名字
            labList:[],
            // 添加实验桌数据保存
            addBenchList:[]
        }
    },
    methods:{
        getBenchList(){
            // 获取所有的实验桌数据，注意: 前面没有/admin/
            this.$http.get('/bench/list')
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('获取所有实验桌数据失败')
                }else{
                    this.$message.success('获取所有实验桌信息成功')
                     this.benchList = res.data.data;
                     this.total = res.data.data.length;
                     console.log(this.benchList);
                }

            })

        },
        // 获得实验室信息提供给选择框使用
        getLabList(){
            this.$http.get(`/admin/lab/list`)
            .then(res=>{
                const data = [];
                if(res.data.code!==200){
                    this.$message.error('获取实验室信息失败');
                }else{
                    console.log(res);
                    this.$message.success('获取实验室信息成功');
                    for(var i =0; i<res.data.data.length;i++){
                        data.push({
                            labId: res.data.data[i].labId,
                            labName: res.data.data[i].labName
                        })
                    }
                    // labList得到实验室id和实验室名字
                    this.labList = data;
                }
            })
        },
        // 点击按钮查找实验室下面的实验桌
        searchLab(){
            this.$http.get(`/bench/searchByLabId/${this.searchInput.labId}`)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('查找失败');
                }else{
                    // console.log(res);
                    this.$message.success('查找成功');
                    console.log(res.data.data);
                    this.benchList = res.data.data;
                    this.total = res.data.data.length;
                }
            })
        },
        // 删除实验桌数据
        delteBench(row){
            this.$confirm('此操作将永久删除该实验台信息， 是否继续？','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // 点击确认后，向后台发送请求，删除教师
                this.$http.get(`/admin/bench/delete/${row.id}`)
                .then(res=>{
                    if(res.data.code!==200){
                        this.$message.error('删除实验室失败');
                    }else{
                        this.$message.success('删除实验室成功');
                        // 刷新列表
                        this.getBenchList();
                    }
                })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message:'已取消删除'
                    })
            });
        },
        // 修改实验桌信息
        updateBench(row){
            // 弹窗显示
            this.updateVisible = true;

            // this.$http.get()
        },
        // 添加实验桌
        addBench(){
            this.$http.post(`/admin/bench/save`,{labId: this.addBenchList.labId, benchName: this.addBenchList.benchName, comment: this.addBenchList.comment})
            .then(res=>{
                console.log(res);
                console.log(this.addBenchList);
                if(res.data.code!==200){
                    this.$message.error('添加实验桌失败');
                }else{
                    this.$message.success('添加实验桌成功');
                    // 刷新列表
                    this.getBenchList();
                    this.empty();
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
            // this.getLabList();
        },
        // 添加实验室清空输入框
        empty(){
            this.addBenchVisible = false;
            this.addBenchList = {};
        }
    },
    created(){
        this.getBenchList();
        this.getLabList();
    }

}
</script>

<style>

</style>