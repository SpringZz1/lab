<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="4">
                <div>
                    <el-input placeholder="想要查询的教师姓名" v-model="searchInput.name" class="input-with-select" @click="getTeacherList" clearable @clear="getTeacherList">
                    </el-input>
                    <!-- <button style="width:100px;" @click="getTeacherList"></button> -->
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <el-input placeholder="请输入想要查询的教师电话" v-model="searchInput.phone" class="input-with-select" @click="getTeacherList" clearable @clear="getTeacherList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div>
                    <el-button type="primary" @click="searchTeacher">查找</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
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
        prop="nickname"
        label="昵称"
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
            :active-value=1
            :inactive-value=0
            @change="changeStatus(scoped.row.id,$event)">
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
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateTeacher(scope.row)" ></el-button>
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
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="pageNum"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
        <el-form :model="updateTeacherList" :rules="updateTeacherFormRul" ref="updateTeacherFormRel" label-width="auto">
            <el-form-item label="教师姓名" >
                <el-input v-model="updateTeacherList.name" ></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="updateTeacherList.phone" ></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="updateTeacherList.workId" disabled></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTeacherButton">确 定</el-button>
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
            // 分页相关参数
            // 当前页码，默认为第一页
            pageNum:1,
            // 一页默认5条信息
            pageSize:5,
            // 显示数据总数
            total:0,
            // 教师数据列表, 从数据库获取渲染
            list:[],
            // 添加教师界面显示/隐藏
            addLabVisible:false,
            // 修改教师信息界面显示/隐藏
            updateVisible:false,
            // 搜索内容
            searchInput:{
                // 教师姓名
                name:'',
                // 教师电话
                phone:''
            },
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
            updateTeacherList:{
                // 教师id，用于携带传入post请求
                id: '',
                // 修改教师电话
                phone: '',
                // 修改教师姓名
                name:'',
                // 修改教师工号
                workId:'',

            },
            // 教师信息修改规则
            updateTeacherFormRul:{
            name:[
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            phone:[
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 3, max: 12, message: '请输入正确长度的号码', trigger: 'blur'}
            ],
            workId:[
                { required: true, message: '请输入工号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ]
            }
        }
    },
    methods:{
        // 查询教师信息
        getTeacherList(){
            console.log('1111');
            this.$http.get(`/teacher/list`)
            .then(res=>{
                if(res.data.code!==200)return this.$message.error('请求教师列表失败');
                else{
                    this.$message.success('请求教师列表成功');
                    // console.log(res);
                    // 获得后台数据
                    this.list = res.data.data;
                    // console.log(res.data.data.length);
                    this.total = parseInt(res.data.data.length);
                    // console.log(this.total);
                }
            }
            )
        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            console.log(`每页 ${newSize} 条`);
            this.pageSize =newSize;
            this.getTeacherList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            console.log(`当前页码 {$newNum} 页`);
            this.pageNum = newNum;
            this.getTeacherList();
        },
        // 修改教师审核状态
        changeStatus(id,status){
            console.log('id: '+id);
            console.log('status: '+ typeof status);
            // 更新教师审核状态
            // console.log('status: ' + Number(status));
            this.$http.post(`/teacher/update`,{id: id, status: status})
            .then(res=>{
                console.log('before');
                // console.log(res.data.data[].status);
                console.log('after');
            })
            // 当前switch状态 boolean
            // this.getTeacherList();
        },
        // 搜索教师
        searchTeacher(){
            // console.log('22222');
            this.$http.post(`teacher/find`, this.searchInput)
            .then(res=>{
                console.log(res);
                if(res.data.data.length==0){
                    this.$message.error('不存在该教师');
                }else{
                    this.$message.success('查询教师成功');
                    this.list = res.data.data;
                }
            })
        },
        // 删除教师
        deleteTeacher(row){
            this.$confirm('此操作将永久删除该教师信息， 是否继续？','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // console.log('row: '+ typeof row);
                // console.log('id:'+ typeof row.id);
                // 点击确认后，向后台发送请求，删除教师
                this.$http.post(`teacher/delete`,{id : row.id})
                .then(res=>{
                    // console.log(typeof row.id);
                    // console.log(res);
                    if(res.data.code!==200){
                        this.$message.error('删除失败');
                    }else{
                        this.$message.success('删除成功');
                    }
                })
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
        // 点击修改信息，弹窗显示内容
        updateTeacher(row){
            // 弹窗显示
            this.updateVisible = true;
            console.log('success');
            // 根据教师id获取当前教师信息
            this.$http.get(`teacher/findById/${row.id}`)
            .then(res=>{
                // console.log(res);
                // 保存该教师信息
                this.updateTeacherList.id = res.data.data.id;
                this.updateTeacherList.name = res.data.data.name;
                this.updateTeacherList.phone = res.data.data.phone;
                this.updateTeacherList.workId = res.data.data.workId;
            })
        },
        // 点击修改教师弹窗确定按钮，发送后台请求修改信息
        updateTeacherButton(){
            this.$http.post(`/teacher/update`,{id: this.updateTeacherList.id, name: this.updateTeacherList.name, phone: this.updateTeacherList.phone})
            .then(res=>{
                // console.log(res);
                // console.log(this.updateTeacherList.phone);
                this.updateVisible = false;
                this.getTeacherList();
                // console.log(res.data.data.name);
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