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
                    <el-input placeholder="请输入想要查询的教师工号" v-model="queryInfo.query" class="input-with-select" clearable @clear="getTeacherList">
                    <el-button slot="append" icon="el-icon-search" @click="getTeacherList"></el-button>
                    </el-input>
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
    :data="teacherList"
    border
    style="width: 100%">
        <el-table-column
        prop="teacher_name"
        label="教师姓名"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacehr_phone"
        label="电话号码"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacher_work_id"
        label="工号"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacher_nick_name"
        label="昵称"
        align="center">
        </el-table-column>
        <el-table-column
        prop="teacher_status"
        label="审核状态"
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
        <el-table-column
        prop=""
        label="操作"
        align="center">
        <template>
            <el-row>
                    <el-tooltip class="item" effect="dark" content="修改信息" placement="top">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateVisible=true"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
         </el-table>

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
         </el-table>

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
            queryInfo:{
                query:'',
                pageNum:'1',
                pageSize:'2'
            },
            // 教师数据列表, 这里暂时使用假数据，后续从数据库获取渲染
            teacherList:[
                {
                teacher_id:'001',
                teacher_name: '小明',
                teacehr_phone: '130xxxxxx',
                teacher_work_id: 'QSZ1234',
                teacher_open_id: 'abc123',
                teacher_nick_name: '苹果',
                teacher_status : true,
                teacher_lab_id:'101'
            },
            {
                teacher_id:'002',
                teacher_name: '小红',
                teacehr_phone: '159xxxxxx',
                teacher_work_id: 'QSZ4321',
                teacher_open_id: 'abc456',
                teacher_nick_name: '香蕉',
                teacher_status : false,
                teacher_lab_id:'102'
            }
            ],
            // 当前数据总数
            total :2,
            // 添加教师界面显示/隐藏
            addLabVisible:false,
            // 修改教师信息界面显示/隐藏
            updateVisible:false,

            // 简易switch 实验室数据, 这里暂时使用假数据
            // labList:[
            //     {
            //     lab_id:'101'
            // },
            // {
            //     lab_id:'102'
            // }],
            labList: generateData(),
            labValue: [101]
        }
    },
    methods:{
        // 查询教师信息
        getTeacherList(){
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
            // this.getTeacherList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // this.queryInfo.pageNum = newNum;
            // this.getTeacherList();
        },
        create(){
            this.getTeacherList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getTeacherList();
        }

    }
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