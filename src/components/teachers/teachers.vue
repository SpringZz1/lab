<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="15">
            <el-col :span="8">
                <div>
                    <el-input placeholder="请输入想要查询的教师工号" v-model="searchTeacher" class="input-with-select" @click="getTeacherList" clearable @clear="getTeacherList">
                    <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                    <!-- <button style="width:100px;" @click="getTeacherList"></button> -->
                </div>
            </el-col>
            <!-- 新增教师按钮 -->
            <!-- <el-col :span="4">
                <el-button type="primary" @click="addTeacherVisible = true">新增教师</el-button>
            </el-col> -->
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="list"
    border
    style="width: 100%">
        <el-table-column
        prop="name"
        label="教师姓名"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="电话号码"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="workId"
        label="工号"
        align="center">
        </el-table-column>
        <el-table-column
        prop="status"
        label="审核状态"
        align="center">
        <template slot-scope="scoped">
        <el-switch
            v-model="scoped.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scoped.row.workId,$event)">
        </el-switch>
        </template>
        </el-table-column>
        <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="scope">
            <el-row>
                    <el-tooltip class="item" effect="dark" content="修改信息" placement="top">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTeacher(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTeacher(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分配实验室" placement="top">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="addLabVisible=true"></el-button>
                    </el-tooltip>
            </el-row>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <!-- <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="1"
      :page-sizes="[1,2,3,4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
    </el-card>

    <!-- 分配实验室弹窗 -->
    <el-dialog
        title="分配实验室"
        :visible.sync="addLabVisible"
        width="50%"
        >
        <!-- 内容区域 -->
        <template>
            <el-transfer
            v-model="labValue"
            :data="labList"
            :titles="['可分配实验室','已分配实验室']"
            class="labTransfer"
            ></el-transfer>
        </template>
        <!-- 简易版switch -->
            <!-- <el-table
                :data="labList"
                 border
                 style="width: 100%">
                <el-table-column
                    prop="lab_id"
                    label="实验室号"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="lab_id"
                    label="分配"
                    align="center">
                        <template slot-scope="scoped">
                            <el-switch
                                v-model="scoped.row.teacher_status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeStatus(scoped.row.teacher_work_id,$event)">
                            </el-switch>
                        </template>
                </el-table-column>


            </el-table> -->

            <!-- <el-table-column
                prop="lab_id"
                label="分配状态"
                align="center">
                <template>
                    <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
            </el-table-column> -->
         <!-- </el-table> -->

        <span slot="footer" class="dialog-footer">
        <el-button @click="addLabVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLabVisible = false">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 修改教师信息 -->
        <el-dialog
        title="修改信息"
        :visible.sync="updateVisible"
        width="50%"
        >
        <!-- 内容区域 -->
        <template>
            <span>修改教师信息界面，修改什么内容尚待讨论</span>
        </template>


        <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data(){
        // 穿梭栏添加实验室
        const generateData = _ => {
            const labList = [];
            for (let i = 101; i <= 104; i++) {
                 labList.push({
                    key: i,
                    label: `实验室 ${ i }`,
                    });
            }
            return labList
        };
        return{

            // query绑定搜索框
            // 请求教师信息参数
            // queryInfo:{
            //     query:'',
            //     pageNum:'1',
            //     pageSize:'2'
            // },
            // 教师数据列表, 这里暂时使用假数据，后续从数据库获取渲染
            list:
                [{
                // 教师id
                // id:'1',
                // 教师姓名
                // name: '12',
                // 教师电话
                // phone: '312',
                // 教师工号
                // workId: '32',
                // 教师open_id,等价于教师微信号
                // openId: '32',
                // 审核状态
                // status : '32',
                // 管理的实验室
                // labId:'32',
                // 教师昵称
                // nickname:'',
                // 头像地址
                // avatarUrl:''
            }],
            // 当前数据总数
            // total :2,
            // 添加教师界面显示/隐藏
            addLabVisible:false,
            // 修改教师信息界面显示/隐藏
            updateVisible:false,
            // 搜索内容
            searchTeacher:'',
            // 简易switch 实验室数据, 这里暂时使用假数据
            // labList:[
            //     {
            //     lab_id:'101'
            // },
            // {
            //     lab_id:'102'
            // }],
            labList: generateData(),
            labValue: [101],
            // 存储获取到的教师信息
            editTeacherParams:{
                // 目前只修改老师的电话
                phone: '',

            }
        }
    },
    methods:{
        // 查询教师信息
        getTeacherList(){
            console.log('1111');
            this.$http.get(`/teacher/list`)
            .then(res=>{
                console.log(res);
            //     if(res.code!==200)return this.$message.error('请求教师列表失败');
            //     else{
            //         this.$message.success('请求教师列表成功');
            //         console.log(res);
            //     }
            }
            )
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
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getTeacherList();
        },
        // 删除教师
        deleteTeacher(row){
            this.$confirm('此操作将永久删除该教师信息， 是否继续？','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // 点击确认后，向后台发送请求，删除教师
                // this.$http.delete(`teachers/$(row.id)`).then(res=>(
                    // console.log(res)
                    // if(res.data.data.meta!==200) return this.$message.error('删除教师失败')
                // ))
                this.$message({
                    type: 'success',
                    message:'删除成功!'
                });
                // 刷新列表
                this.getTeacherList();
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message:'已取消删除'
                })
            });
        },
        // 修改教师信息
        editTeacher(row){
            // 根据教师信息获取当前教师信息
            this.$http.get(`teacher/$(row.id)`).then(res=>{
                console.log(res);
            // 存储获得到教师信息
            this.editTeacherParams.phone =res.data.data.phone;
            console.log(this.editTeacher);
            })
        }

    },
    // 生命周期函数，放在methods，data外面，这样能够让一加载页面就渲染页面
    created(){
        this.getTeacherList();
    },
}
</script>

<style scope="scoped">
.labTransfer {
    text-align: left;
}

.el-dialog__body {
    padding-left: 80px;
}
</style>