<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="4">
                <div>
                    <el-input placeholder="课程名" v-model="searchInput.name" class="input-with-select" clearable @clear="getCourseList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    <el-select v-model="searchInput.labId" filterable placeholder="实验室" clearable>
                        <el-option
                              v-for="lab in labList"
                            :key="lab.labId"
                            :label="lab.labName"
                            :value="lab.labId">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="1">
                <div>
                    <el-button type="primary" @click="searchCourse">查找</el-button>
                </div>
            </el-col>
                        <el-col :span="4">
                <div>
                    <el-button type="primary" @click="addCourseVisible = true">添加课程</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="courseList.slice((pageNum-1)*pageSize,pageNum*pageSize)"
    border
    style="width: 100%">
        <el-table-column
        prop="name"
        label="课程名"
        align="center">
        </el-table-column>
        <el-table-column
        prop="labName"
        label="实验室"
        align="center">
        </el-table-column>
         <el-table-column
        prop="week"
        label="星期"
        align="center">
        </el-table-column>
        <el-table-column
        prop="courseTime"
        label="课程时间"
        align="center">
        </el-table-column>
        <!-- <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="scope">
            <el-row>
              <el-tooltip class="item" effect="dark" content="删除课程" placement="top">
                        <el-button type="danger" icon="el-icon-edit" size="mini" @click="deleteCourse(scope.row)" ></el-button>
                    </el-tooltip>
            </el-row>
        </el-table-column> -->

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
        :visible.sync="addCourseVisible"
        width="50%"
        >
        <!-- 内容区域 -->
            <el-row  style="margin-bottom:20px">
                <el-col :span="12">
                    <!-- 课程名使用输入框输入 -->
                    <el-input v-model="addCourseList.name" placeholder="请输入课程名" style="width:60%"></el-input>
                </el-col>
                <el-col :span="12">
                    <!-- 课程时间用输入框输入 -->
                    <el-input v-model="addCourseList.courseTime" placeholder="课程时间，例: 第1-2节" style="width:60%"></el-input>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <!-- 添加实验室号，使用下拉框选择，数据从后台获取 -->
                    <el-select v-model="addCourseList.labId" filterable placeholder="实验室">
                        <el-option
                              v-for="lab in labList"
                            :key="lab.labId"
                            :label="lab.labName"
                            :value="lab.labId">
                        </el-option>
                    </el-select>
                    <!-- 添加实验室，第一个数据暂时使用输入框 -->
                    <!-- <el-input v-model="addCourseList.labId" placeholder="请输入实验室号，例: 101" style="width:60%"></el-input> -->
                </el-col>
                <el-col :span="12">
                    <!-- 星期几选择，使用下拉框 -->
                    <el-select v-model="addCourseList.week" filterable placeholder="星期">
                        <el-option
                            v-for="item in this.week"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

        <span slot="footer" class="dialog-footer">
        <el-button @click="empty">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
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
            // 课程数据列表, 从后端获得渲染表格
            courseList:[],
            // 搜索实验室
            searchInput:{
                name:'',
                labId:''
            },
            // 保存添加课程信息
            addCourseList:{
                labId:'',
                name:'',
                courseTime:'',
                week:''
            },
            // 添加课程时使用
            week:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
            // 课程列表
            labList:[],
            // 添加课程显示/隐藏
            addCourseVisible : false
        }
    },
    methods:{
        // 查询课程信息
        getCourseList(){
            this.$http.get(`admin/course/list`)
            .then(res=>{
                // console.log(res);
                if(res.data.code!==200){
                    this.$message.error('请求课程信息失败');
                }else{
                    this.$message.success('请求课程信息成功');
                    this.courseList = res.data.data;
                    this.total = res.data.data.length;
                }
            })
        },
        searchCourse(){
            // searchInput中的labId为number类型，需要转换成string类型, 这里错了很多次，需要记住
            this.searchInput.labId = this.searchInput.labId +'';
            console.log(this.searchInput);
            this.$http.post(`admin/course/selectByParam`,this.searchInput)
            .then(res=>{
                console.log(res);
                console.log(this.searchInput.labId);
                // console.log(this.searchInput.name);
                // console.log(typeof this.searchInput.labId);
                if(res.data.data.length==0){
                    this.$message.error('不存在该课程');
                }else{
                    this.$message.success('查找成功');
                    this.courseList = res.data.data;
                    this.total = res.data.data.length;
                }
            })
        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            this.pageSize =newSize;
            this.getCourseList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
             this.pageNum = newNum;
             this.getCourseList();
        },
        // 删除课程
        deleteCourse(row){
            this.$http.get(`admin/course/delete${row.id}`)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('删除课程失败');
                }else{
                    this.$message.success('删除课程成功');
                    // 刷新列表
                    this.getCourseList();
                }
            })
        },
        // 添加课程
        addCourse(){
            console.log(typeof this.addCourseList.week);
            let temp = JSON.stringify(this.addCourseList);
            console.log(this.addCourseList);
            console.log(typeof temp);
            this.$http.post(`admin/course/save`,{labId: this.addCourseList.labId, name: this.addCourseList.name,
             courseTime: this.addCourseList.courseTime, week: this.addCourseList.week})
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('添加课程失败');
                }else{
                    this.$message.success('添加课程成功');
                    //刷新列表
                    this.getCourseList();
                    this.addCourseVisible=false;
                }
            })
        },
         // 获得实验室labId
        getLabList(){
            this.$http.get(`admin/lab/list`)
            .then(res=>{
                const data=[];
                if(res.data.code!==200){
                    this.$message.error('获取实验室信息失败');
                }else{
                    console.log(res);
                    this.$message.success('获取实验室信息成功');
                    for(var i = 0;i<res.data.data.length;i++){
                        data.push({
                            labId:res.data.data[i].labId,
                            labName:res.data.data[i].labName
                        })
                    }
                    // labList得到实验室id和实验室名字
                    this.labList = data;
            }
        })
    },
    // 清空在点击取消之后的添加课程列表的输入框的内容
    empty(){
        this.addCourseList = {},
        this.addCourseVisible = false
    }
    },
    created(){
        this.getCourseList();
        this.getLabList();
    }
}
</script>

<style>

</style>