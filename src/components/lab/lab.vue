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
        label="负责教师"
        width="180"
        align="center"
        >
        <template slot-scope="scope" >
            <span>{{scope.row.teacherName}}</span>
            <!-- <span v-for="i in element">{{i}} </span> -->
            <!-- <span v-for="i in scope.row.teacherName">{{i}}</span> -->
            <!-- <span >{{scope.row.teacherName}}</span> -->

            <!-- <span>{{scope.row.teacherName}}</span> -->
            <!-- <span v-for="i in scope.row.teacherName">{{i}}</span> -->
        </template>
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
                    <!-- 给不同的教师分配实验室负责日期使用，待完成 -->
                    <!-- <el-tooltip class="item" effect="dark" content="值班安排" placement="top">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="dutyPlan(scope.row)"></el-button>
                    </el-tooltip> -->
                    <!-- 批量添加实验桌 -->
                    <el-tooltip class="item" effect="dark" content="批量添加实验室" placement="top">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="bulkAdd(scope.row)"></el-button>
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
            <!-- <el-form-item label="实验桌数量" prop="benchNum">
                <el-input-number v-model="addLabList.benchNum"  :min="0" :max="30" label="选择实验桌数量"></el-input-number>
            </el-form-item> -->

        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="empty">取 消</el-button>
        <el-button type="primary" @click="addLab">确 定</el-button>
        </span>
        </el-dialog>
    <!-- </el-dialog>
    <!-- 安排值班弹窗 -->
    <!-- <el-dialog
        title="教师排班"
        :visible.sync="dutyPlanVisible"
        width="60%"
        >
        <!-- 内容部分 -->
        <!-- <div class="block">
            <!-- <el-cascader
            :key="keyVal"
            :options="dutyPlan"
            :props="props"
            v-model="dutyPlanInput"
             clearable
             ></el-cascader> -->
              <!-- <el-table :data="teacherList" border align="center">
                <el-table-column property="name" label="姓名" width="150" align="center"></el-table-column>
                <el-table-column property="week" label="排班情况" width="200" align="center">
                    <template slot-scope="scope">
                     <el-tag
                     :key='tag'
                     v-for="tag in scope.row.week"
                     >
                        {{ tag }}
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="week"
                    label="安排排班"
                    align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.week" placeholder="排班选择" multiple>
                          <el-option v-for=" i in week" :key="i.key" :value="i.value" ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="操作"
                align="center"
                width="200"
                >
                <template slot-scope="scope">
                <el-button type="primary" @click="dutyPlanBtn(scope.row)">确认</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 按钮部分 -->
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dutyPlanVisible = false">取 消</el-button>
            <el-button type="primary" @click="dutyPlanVisible = false">确 定</el-button>
        </span>
    </el-dialog> -->
    <!-- 批量添加实验室弹窗 -->
    <el-dialog
        title="批量添加实验桌"
        :visible.sync="bulkAddVisible"
        width="30%"
        >
            <el-form :model="bulkAddList" label-width="auto">
                <el-form-item label="实验桌前缀" prop="benchName">
                    <el-input v-model="bulkAddList.benchName" style="width:55%" placeholder="例如:402" clearable></el-input>
                </el-form-item>
                <el-form-item label="实验桌数量" prop="nums">
                    <el-input-number v-model="bulkAddList.nums"  :min="0" :max="30" label="选择实验桌数量"></el-input-number>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="bulkAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="bulkAddBtn">确 定</el-button>
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
            // 实验室数据列表, 从数据库获取渲染
            labList:[],
            // 添加实验室弹窗
            addLabVisible : false,
            // 添加实验室信息
            addLabList:{
                labName:'',
                comment:'',
                benchNum:0
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
            benchList:[],
            // 安排值班弹窗显示/隐藏
            // dutyPlanVisible: false,
            // // 级联选择器的option发生变化是需要动态渲染，不然会报错，需要使用一个key来保证变化来保证动态渲染
            // keyVal:0,
            // props: { multiple: true },
            // dutyPlan:[{
            //     // value、和label都是通过后端生成的，这里暂时写假数据进行测试
            //     value: 1,
            //     label: '东南',
            //     children:[
            //         {value: '星期一', label:'星期一'},
            //         {value: '星期二', label:'星期二'},
            //         {value: '星期三', label:'星期三'},
            //         {value: '星期四', label:'星期四'},
            //         {value: '星期五', label:'星期五'},
            //         {value: '星期六', label:'星期六'},
            //         {value: '星期日', label:'星期日'}
            //     ]
            // },
            // {
            //     value: 2,
            //     label: '东北',
            //     children:[
            //         {value: '星期一', label:'星期一'},
            //         {value: '星期二', label:'星期二'},
            //         {value: '星期三', label:'星期三'},
            //         {value: '星期四', label:'星期四'},
            //         {value: '星期五', label:'星期五'},
            //         {value: '星期六', label:'星期六'},
            //         {value: '星期日', label:'星期日'}
            //     ]
            // }],
            // // 用来保存教师排班
            // dutyPlanInput:[]
            // 教师排班表格显示内容，从后端读取，这里暂时写死测试
            // teacherList:[
            //     {
            //         name:'小明',
            //         week:['周一','周二'],
            //     },
            //     {
            //         name:'小红',
            //         week:['周三','周六']
            //     }
            // ],
            // 排班选择
            //  week:[
            //         {value: '星期一', label:'星期一'},
            //         {value: '星期二', label:'星期二'},
            //         {value: '星期三', label:'星期三'},
            //         {value: '星期四', label:'星期四'},
            //         {value: '星期五', label:'星期五'},
            //         {value: '星期六', label:'星期六'},
            //         {value: '星期日', label:'星期日'}
            //     ],
            //  // 排班结果记录
            //  weekInput:{},
             // 用来保存实验室id
             labId:'',
             // 批量添加实验室隐藏/显示
             bulkAddVisible : false,
             bulkAddList:{
                 // 实验室id
                 labId:'',
                 // 实验桌数量
                 nums:0,
                 // 实验桌前缀
                 benchName:''
             }
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
                    console.log('1111');
                    // let data = [];
                    //  console.log(this.labList);
                    // console.log(this.labList[0].teacherName);
                    for(let i = 0; i< res.data.data.length; i++){
                        // data.push(eval(this.labList[i].teacherName));
                        this.labList[i].teacherName = this.labList[i].teacherName.replace(/\[|]/g, '' ).replace(/\"/g, "");
                        // temp.push(this.labList[i].teacherName);
                    }
                    // console.log(res.data.data.length);
                    // data = eval(this.labList[0].teacherName);
                    // console.log(data);
                    // data = eval(data);
                    // console.log(data);
                    console.log('222');
                    this.total = parseInt(res.data.data.length);
                    // let temp = this.labList[0].teacherName.replace(/\[|]/g, '' )
                    // console.log(temp);
                    console.log(this.labList);
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
        // 点击值班安排齿轮按钮就获取这个实验室id
        dutyPlan(row){
            // 此时的row.id 是实验室id
            this.dutyPlanVisible = true;
            console.log(row.labId);
            // 实验室id要保存起来给后面dutyPlanBtn使用
            this.labId = row.labId;
            console.log(this.labId);
        },
        // 根据教师id、实验室id来进行实验室排班确认
        dutyPlanBtn(row){
            // 此时的row.id是教师的id
            // console.log(row.id);
            console.log(this.labId);
        },
        // 批量添加实验桌
        bulkAdd(row){
            this.bulkAddVisible = true;
            console.log(row.labId);
            this.bulkAddList.labId = row.labId;
        },
        bulkAddBtn(){
            this.$http.post(`/admin/bench/batch/save`,this.bulkAddList)
            .then(res => {
                if(res.data.code!==200){
                    this.$message.error('批量添加失败');
                }else{
                    this.$message.success('批量添加成功');
                    this.getLabList();
                    this.bulkAddVisible = false;
                }
            })
        }
    },
    // 点击实验室详情就发起请求渲染表格
    created(){
        this.getLabList();
    },
}
</script>

<style>

</style>