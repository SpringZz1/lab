<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实验室信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加实验室按钮 -->
    <el-card>
        <el-row>
            <el-col>
                <div>
                    <el-button type="primary" @click="addLabVisible = true">添加实验室</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>

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
        <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="scope">
            <el-row>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteLab(scope.row)"></el-button>
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
            <!-- 添加实验室信息 -->
        <el-dialog
        title="添加实验室信息"
        :visible.sync="addLabVisible"
        width="50%"
        >
        <!-- 内容区域 -->
        <el-form :model="addLabList" :rules="addLabListFormRul" ref="addLabListFormRel" label-width="auto">
            <el-form-item label="实验室号" prop="labName">
                <el-input v-model="addLabList.labName" clearable></el-input>
            </el-form-item>
            <el-form-item label="实验室简介" prop="comment">
                <el-input v-model="addLabList.comment" clearable></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="empty">取 消</el-button>
        <el-button type="primary" @click="addLab">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 在这个实验室中添加或删除实验桌弹窗 -->
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
            // 添加实验室弹窗
            addLabVisible : false,
            // 添加实验室信息
            addLabList:{
                labName:'',
                comment:''
            },
            // 添加实验室规则检验
            addLabListFormRul:{
                labName:[
                    { required:true, message: '请输入实验室名', trigger: 'blur'},
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                ],
                comment:[
                     { required:true, message: '请输入实验室简介', trigger: 'blur'},
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
                ]
            },
            // 实验室的实验桌操作弹窗显示/隐藏
            benchVisible : false,
            // 获取到的该实验室的实验桌信息, 用来渲染实验桌表格
            benchList:[]
        }
    },
    methods:{
        //  axios获取后台数据函数
        getLabList(){
            this.$http.get(`/admin/lab/list`)
            .then(res=>{
                console.log(res);
                if(res.data.code!==200){
                    this.$message.error('获取实验室信息失败');
                }else{
                    console.log(res);
                    this.$message.success('获取实验室信息成功');
                     this.labList = res.data.data;
                     console.log(this.labList);
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
            // this.getLabList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getTeacherList();
        },
        // 删除实验室
        deleteLab(row){
            this.$confirm('此操作将永久删除该实验室， 是否继续？','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{

                // 点击确认后，向后台发送请求，删除实验室
                this.$http.get(`/admin/lab/delete/${row.labId}`)
                .then(res=>{
                    // console.log(typeof row.id);
                    // console.log(res);
                    if(res.data.code!==200){
                        this.$message.error('删除实验室失败');
                    }else{
                        this.$message.success('删除实验室成功');
                        // 刷新列表
                        console.log(row.labId);
                        this.getLabList();
                    }
                })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message:'已取消删除'
                })
            });
        },
        // 添加实验室
        addLab(){
            this.$http.post(`/admin/lab/save`, this.addLabList)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('添加实验室失败');
                }else{
                    this.$message.success('添加实验室成功');
                    // 刷新列表
                    this.getLabList();
                    // 弹窗消失
                    this.empty();
                }
            })
        },
        // 添加实验室点击取消后清空addLabList的值
        empty(){
            // 添加实验室弹窗消失
            this.addLabVisible = false;
            // 清空列表信息
            this.addLabList = {};
        },
        // 操作该实验室的实验桌，可以增加实验桌和删除实验桌
        getBenchList(row){
            // 实验桌界面显示
            benchVisible = true;
        },
        // 修改实验桌的名字和备注
        updateBench(row){
        },
        // 删除实验桌
        deleteBench(row){
            this.$confirm('此操作将永久删除该实验桌， 是否继续？','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // 点击确认后，向后台发送请求，删除实验桌
                this.$http.get(`/admin/bench/delete/${row.labId}`)
                .then(res=>{
                    // console.log(typeof row.id);
                    // console.log(res);
                    if(res.data.code!==200){
                        this.$message.error('删除实验桌失败');
                    }else{
                        this.$message.success('删除实验桌成功');
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
    },
    // 点击实验室详情就发起请求渲染表格
    created(){
        this.getLabList();
    }
}
</script>

<style>

</style>