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
                    <el-input placeholder="请输入想要查询的教师电话" v-model="searchInput.phone" class="input-with-select" @click="addLab()" clearable @clear="getTeacherList">
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
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="addLab(scope.row)"></el-button>
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
            :props="{
                key:'labId',
                label:'labName'
            }"
            :data="labList"
            :titles="['可分配实验室','已分配实验室']"
            class="labTransfer"
            ></el-transfer>
        </template>
        <!-- 选项部分 -->
        <span slot="footer" class="dialog-footer">
        <el-button @click="addLabVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeLab">确 定</el-button>
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
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="updateTeacherList.phone" ></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="workId">
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
            // 添加教师实验室显示/隐藏
            addLabVisible :false,
            // 修改教师信息界面显示/隐藏
            updateVisible:false,
            // 搜索教师内容
            searchInput:{
                // 教师姓名
                name:'',
                // 教师电话
                phone:''
            },
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
                { required: true, message: '请输入电话号码', trigger: 'blur' },
                { min: 3, max: 12, message: '请输入正确长度的号码', trigger: 'blur'}
            ],
            workId:[
                { required: true, message: '请输入工号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ]
            },
            // 穿梭栏左边数据，也就是列出实验室
            labList:[],
            // 教师管理的实验室
            labValue:[],
            // 保存管理实验室教师的id
            labTeacherId:[]
        }
    },
    methods:{
        // 查询教师信息
        getTeacherList(){
            // console.log('1111');
            this.$http.get(`/admin/teacher/list`)
            .then(res=>{
                // console.log('1');
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
            // console.log(`每页 ${newSize} 条`);
            this.pageSize =newSize;
            this.getTeacherList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // console.log(`当前页码 {$newNum} 页`);
            this.pageNum = newNum;
            // this.getTeacherList();
        },
        // 修改教师审核状态
        changeStatus(id,status){
            // console.log('id: '+id);
            // console.log('status: '+ typeof status);
            // 更新教师审核状态
            // console.log('status: ' + Number(status));
            this.$http.post(`/admin/teacher/update`,{id: id, status: status})
            .then(res=>{
                // console.log('before');
                // console.log(res.data.data[].status);
                // console.log('after');
            })
            // 当前switch状态 boolean
            // this.getTeacherList();
        },
        // 搜索教师
        searchTeacher(){
            // console.log('22222');
            this.$http.post(`/admin/teacher/find`, this.searchInput)
            .then(res=>{
                // console.log(res);
                if(res.data.data.length==0){
                    this.$message.error('不存在该教师');
                }else{
                    this.$message.success('查询教师成功');
                    this.list = res.data.data;
                    this.total = res.data.data.length;
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
                this.$http.post(`/admin/teacher/delete`,{id : row.id})
                .then(res=>{
                    // console.log(typeof row.id);
                    // console.log(res);
                    if(res.data.code!==200){
                        this.$message.error('删除教师失败');
                    }else{
                        this.$message.success('删除教师成功');
                        // 刷新列表
                        this.getTeacherList();
                    }
                })
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
            // console.log('success');
            // 根据教师id获取当前教师信息
            this.$http.get(`/admin/teacher/findById/${row.id}`)
            .then(res=>{
                console.log(`/admin/teacher/findById/${row.id}`);
                // console.log(res);
                // 保存该教师信息
                this.updateTeacherList.id = res.data.data.id;
                this.updateTeacherList.name = res.data.data.name;
                this.updateTeacherList.phone = res.data.data.phone;
                this.updateTeacherList.workId = res.data.data.workId;
                // console.log(this.updateTeacherList);
            })
        },
        // 点击修改教师弹窗确定按钮，发送后台请求修改信息
        updateTeacherButton(){
            this.$http.post(`/admin/teacher/update`,{id: this.updateTeacherList.id, name: this.updateTeacherList.name, phone: this.updateTeacherList.phone})
            .then(res=>{
                // console.log(res);
                // console.log(this.updateTeacherList.phone);
                this.updateVisible = false;
                this.getTeacherList();
                // console.log(res.data.data.name);
            })
        },
        // 获取所有实验室列表
        getLabList(){
            this.$http.get(`/admin/lab/list`)
            .then(res=>{
                // console.log(res);
                const data = [];
                if(res.data.code!==200){
                    this.$message.error('请求实验室数据失败');
                }else{
                    this.$message.success('请求实验室数据成功');
                    for(var i = 0;i<res.data.data.length;i++){
                        data.push({
                            labId:res.data.data[i].labId,
                            labName: res.data.data[i].labName
                        })
                    }
                    this.labList = data;
                    // this.labList = Object.entries(data);
                    // console.log(this.labList);
                }
        })
        },
        // 根据id获取这个教师所管理的实验室
        addLab(row){
            // 弹窗显示
            this.addLabVisible=true;
            // this.$http.get(`/admin/teacher/findById/259`)
            this.$http.get(`/admin/teacher/findById/${row.id}`)
            .then(res=>{
                console.log(res);
                // console.log(`/admin/teacher/findById/${row.id}`);
                const data=[];
               if(res.data.code!==200){
                   this.$message.error('获取该教师的实验室信息失败');
               }else{
                   this.$message.success('获取该教师的实验室信息成功');
                    // 实验室id插入labValue, string转array
                    data.push({
                        labId: res.data.data.labId,
                        labName: res.data.data.labName,
                        teacherId: res.data.data.id
                    })
                    // console.log(data);
                    let temp = data[0].labId;
                    let temp1 = eval(temp);

                    this.labValue = temp1;
                    this.labTeacherId = (data[0].teacherId);
                    // console.log(this.labValue);
                    // console.log(this.labTeacherId);
                    // console.log(this.labValue);
                    // this..push(data[0].teacherId);
               }
            })
        },
        // 穿梭框转移时修改教师管理数据库
        changeLab(){
            // 先将结果转换为array
            let temp = Array.from(this.labValue);
            // 再将array格式转换为JSON格式，传给后端
            let temp1 = JSON.stringify(temp);
            // console.log(typeof this.labTeacherId);
            this.$http.post(`/admin/teacher/updateLab`, {id:this.labTeacherId, labIds: temp1})
            .then(res=>{
                // console.log(res);
                if(res.data.code!==200){
                    this.$message.error('更新教师实验室信息失败');
                }else{
                    this.$message.success('更新教师实验室信息成功');
                    this.addLabVisible = false;
                }
            })
        }

    },
    // 生命周期函数，放在methods，data外面，这样能够让一加载页面就渲染页面
    created(){
        this.getTeacherList();
        this.getLabList();
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