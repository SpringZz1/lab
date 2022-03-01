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
                    <el-input placeholder="实验室号" v-model="searchInput.labId" class="input-with-select"  clearable @clear="getCourseList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="2">
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
                    <el-select v-model="addCourse" filterable placeholder="课程名" >
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.name"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="addCourse" filterable placeholder="课程时间">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.courseTime"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-select v-model="addCourse" filterable placeholder="实验室">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.labId"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="addCourse" filterable placeholder="星期">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.week"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

        <span slot="footer" class="dialog-footer">
        <el-button @click="addCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourseVisible = false">确 定</el-button>
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
            // 提供添加实验室下拉选项
            addCourseInput:{
                // 课程名
                name:[],
                // 课程时间
                courseTime:[],
                // 实验室id
                labId:[],
                // 周几
                week:[]
            },
            // 保存添加课程信息
            addCourse:'',
            input:[{
            }],
            // 添加课程显示/隐藏
            addCourseVisible : false
        }
    },
    methods:{
        // 查询课程信息
        getCourseList(){
            this.$http.get(`course/list`)
            .then(res=>{
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
            this.$http.post(`/course/selectByParam`,this.searchInput)
            .then(res=>{
                console.log(res);
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
        deleteCourse(row){
            this.$http.get(`course/delete${row.id}`)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('删除课程失败');
                }else{
                    this.$message.success('删除课程成功');
                    // 刷新列表
                    this.getCourseList();
                }
            })
        }
    },
    created(){
        this.getCourseList();
    }
}
</script>

<style>

</style>