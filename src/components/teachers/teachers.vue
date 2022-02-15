<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="15">
            <el-col :span="8">
                <div>
                    <el-input placeholder="请输入想要查询的教师工号" v-model="input3" class="input-with-select" clearable @clear="searchVal">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">新增教师</el-button>
            </el-col>
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="queryInfo"
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
            inactive-color="#ff4949">
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
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分配实验室" placement="top">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
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
      :page-size="100"
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
            // 绑定搜索框
            input3:'',
            // 请求教师信息参数, 这里暂时使用假数据，后续从数据库获取渲染
            queryInfo:[{
                teacher_name: '小明',
                teacehr_phone: '130xxxxxx',
                teacher_work_id: 'QSZ1234',
                teacher_open_id: 'abc123',
                teacher_nick_name: '苹果',
                teacher_status : true
            },
            {
                teacher_name: '小红',
                teacehr_phone: '159xxxxxx',
                teacher_work_id: 'QSZ4321',
                teacher_open_id: 'abc456',
                teacher_nick_name: '香蕉',
                teacher_status : false
            }],
            // 当前数据总数
            total :2
        }
    },
    methods:{
        searchVal(){

        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(){

        },
        // 当前页码发生变化的时候触发
        CurrentChange(){}
        // 请求用户列表数据

    }
}
</script>

<style>

</style>