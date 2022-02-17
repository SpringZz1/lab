<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/"style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>

       <el-row>
           <div>
               <el-row :gutter="20">
                   <el-col :span="4">
                    <el-select v-model="searchCourse" filterable placeholder="课程名">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_name"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                   </el-col>
                   <el-col :span="4">
                    <el-select v-model="searchCourse" filterable placeholder="课程时间">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_time"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                   </el-col>
                    <el-col :span="4">
                    <el-select v-model="searchCourse" filterable placeholder="星期">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_week"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                   </el-col>
                   <el-col :span="4">
                    <el-select v-model="searchCourse" filterable placeholder="实验室">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_lab_id"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                   </el-col>
                   <el-col :span="2">
                     <el-button type="primary">搜索</el-button>
                   </el-col>
                   <el-col :span="4">
                     <el-button type="primary" @click="addCourseVisible = true">添加课程</el-button>
                   </el-col>
               </el-row>
           </div>
       </el-row>

    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="courseList"
    border
    style="width: 100%">
        <el-table-column
        prop="course_name"
        label="课程名"
        align="center">
        </el-table-column>
        <el-table-column
        prop="course_time"
        label="课程时间"
        align="center">
        </el-table-column>
        <el-table-column
        prop="course_week"
        label="星期"
        align="center">
        </el-table-column>
        <el-table-column
        prop="course_lab_id"
        label="实验室"
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
                            :label="courses.course_name"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="addCourse" filterable placeholder="课程时间">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_time"
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
                            :label="courses.course_lab_id"
                            :value="courses.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="addCourse" filterable placeholder="星期">
                        <el-option
                            v-for="courses in courseList"
                            :key="courses.id"
                            :label="courses.course_week"
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

            // query绑定搜索框
            // 请求课程信息参数
            queryInfo:{
                query:'',
                pageNum:'1',
                pageSize:'2'
            },
            // 学生数据列表, 这里暂时使用假数据，后续从数据库获取渲染
            courseList:[
                {
                id:'1',
                course_id: '001',
                course_lab_id:'101',
                course_name: '病理学',
                course_time: '1-2节',
                course_week:'周一'
            },
            {
                id:'12',
                course_id: '002',
                course_lab_id:'101',
                course_name: '护理学',
                course_time: '3-4节',
                course_week:'周一'
            }
            ],
            // 记录搜索条件
            searchCourse:'',
            // 保存添加课程信息
            addCourse:'',
            input:[{

            }],
            // 当前数据总数
            total :2,
            // 添加课程显示/隐藏
            addCourseVisible : false
        }
    },
    methods:{
        // 查询学生信息
        getCourseList(){
            // this.$http.get('teachers',{params:this.queryInfo})
            // .then(res=>{
            //     console.log(res);
            //     if(res.data.meta.status!==200)return this.$message.error('请求教师列表失败');
            //     this.$message.success('请求教师列表成功');
            //     this.teacherList =res.data.data.teachers;
            //     this.total  =res.data.data.total;
            // }
            // )
        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            // this.queryInfo.pageSize =newSize;
            // this.getCourseList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // this.queryInfo.pageNum = newNum;
            // this.getCourseList();
        },
        create(){
            this.getCourseList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getCourseList();
        }

    }
}
</script>

<style>

</style>