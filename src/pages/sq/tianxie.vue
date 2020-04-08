<template>
    <div>
        <mt-cell-group>
            <mt-field label="姓名" placeholder v-model="userobj.XM" readonly></mt-field>
            <mt-field label="学号" placeholder v-model="userobj.XH" readonly></mt-field>
            <mt-field label="学院名称" placeholder v-model="userobj.BJMC" readonly></mt-field>
            <mt-field label="班级名称" placeholder v-model="userobj.DWMC" readonly></mt-field>
            <mt-cell
                class="o-cell"
                title="休学学年"
                :required="true"
                is-link
                v-model="XXXNType"
                @click.native="XXXN()"
            ></mt-cell>
            <mt-cell
                class="o-cell"
                title="休学学期"
                :required="true"
                is-link
                v-model="XXXQType"
                @click.native="XXXQ()"
            ></mt-cell>
            <mt-field label="本人电话" placeholder="请输入本人电话" v-model="BRDH" required></mt-field>
            <mt-field label="父母姓名" placeholder="请输入父母姓名" v-model="FMXM" required></mt-field>
            <mt-field label="父母电话" placeholder="请输入父母电话" v-model="FMDH" required></mt-field>
            <mt-cell
                class="o-cell"
                title="休学原因"
                :required="true"
                is-link
                v-model="XXYYType"
                @click.native="XXYY()"
            ></mt-cell>
            <mt-field label="邮寄地址" placeholder v-model="YJDZ" type="textarea" rows="4" required></mt-field>
            <div class="bh-clearfix cell">
                <div class="fj">上传附件：</div>
                <emapm-upload-imgs
                    :host="host"
                    :host-pathname="hostPathname"
                    :read-only="false"
                    :token="token"
                    :size="1000000"
                    :max-number="5"
                    @on-token-change="onTokenChange"
                ></emapm-upload-imgs>
            </div>
        </mt-cell-group>
        <div style="position: relative;margin-top:10px;">
            <mt-button type="default" size="large" @click="Savedrafts(zt1)">保存草稿</mt-button>
            <mt-button class="anniu" type="primary" size="large" @click="Savedrafts(zt2)">提交</mt-button>
        </div>
		<!-- 休学学年 -->
        <mt-popup v-model="showpopupXXXN" position="bottom">
            <mt-picker :columns="XXXNLIST" showToolbar @confirm="QDXXXN" @cancel="QXXXXN" />
        </mt-popup>
		<!-- 休学学期 -->
        <mt-popup v-model="showpopupXXXQ" position="bottom">
            <mt-picker :columns="XXXQLIST" showToolbar @confirm="QDXXXQ" @cancel="QXXXXQ" />
        </mt-popup>
		<!-- 休学原因 -->
        <mt-popup v-model="showpopupXXYY" position="bottom">
            <mt-picker :columns="XXYYLIST" showToolbar @confirm="QDXXYY" @cancel="QXXXYY" />
        </mt-popup>
    </div>
</template>
<style>
</style>
<style scoped>
.mint-button--large {
    width: 50%;
}
.anniu {
    position: absolute;
    right: 0;
    top: 0;
}
.fj {
    padding: 12px 0;
}
</style>
<script>
import { Toast } from "bh-mint-ui2";
import { Get, Post } from "../../utils";
import api from "../../api";
import moment from "moment";
export default {
    components: {},
    data() {
        return {
            zt1: "保存草稿",
            zt2: "提交",
            userobj: {},           
            showpopupXXXN: false,
            XXXNType: "",
            XXXNId: "",
            XXXNLIST: [],
            //
            showpopupXXXQ: false,
            XXXQType: "",
            XXXQId: "",
            XXXQLIST: [],
            //
            BRDH: "",
            FMXM: "",
            FMDH: "",
            //
            showpopupXXYY: false,
            XXYYType: "",
            XXYYId: "",
            XXYYLIST: [],
            //
            YJDZ: "",
            //
            token: "", //1509007813804371
            host: location.origin,
            hostPathname:
                location.origin +
                location.pathname.substring(
                    0,
                    location.pathname.indexOf("/", 1)
                ),
            commandType: "",
            execute: "",
            id: ""
        };
    },
    watch: {},
    created() {
		//获取学生个人信息
        Get(api.getCurrentStudentInfo, {}).then(res => {
            this.userobj = res.data;
        });
    },
    mounted() {
	},
    methods: {
        //草稿
        Savedrafts(i) {
            if (this.XXXNType == "") {
                Toast("休学学年不可为空！");
                return;
            }
            if (this.XXXQType == "") {
                Toast("休学学期不可为空！");
                return;
            }
            if (this.BRDH == "") {
                Toast("本人电话不可为空");
                return;
            }
            if (this.FMXM == "") {
                Toast("父母姓名");
                return;
            }
            if (this.FMDH == "") {
                Toast("父母电话");
                return;
            }
            if (this.XXYYType == "") {
                Toast("休学原因不可为空！");
                return;
            }
            if (this.YJDZ == "") {
                Toast("邮寄地址不可为空！");
                return;
            }
            let newobj = {
                WID: "",
                CZZ: "",
                CZZXM: "",
                CZRQ: "",
                XM: this.userobj.XM,
                XH: this.userobj.XH,
                XYDM: this.userobj.DWDM,
                XY: this.userobj.DWMC,
                BJDM: this.userobj.BH,
                BJ: this.userobj.BJMC,
                XXXN_DISPLAY: this.XXXNType,
                XXXN: this.XXXNId,
                XXXQ_DISPLAY: this.XXXQType,
                XXXQ: this.XXXQId,
                BRDH: this.BRDH,
                FMXM: this.FMXM,
                FMDH: this.FMDH,
                XXYY_DISPLAY: this.XXYYType,
                XXYY: this.XXYYId,
                SQSJ: moment().format("YYYY-MM-DD HH:mm:ss"),
                YJDZ: this.YJDZ,
                FJSC: this.token
            };
            if (i == "提交") {
                this.commandType = "start";
                this.execute = "do_start";
                this.id = "start";
            } else {
                this.commandType = "draft";
                this.execute = "do_draft";
                this.id = "draft";
            }
            Get(api.startFlow, {
                formData: newobj,
                id: this.id,
                commandType: this.commandType,
                execute: this.execute,
                name: i,
                action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
                commandEvent:
                    "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
                url: "/sys/emapflow/tasks/startFlow.do",
                disabled: true,
                taskId: "",
                defKey: "pubdzxxsqapp.xxFlow"
            }).then(res => {
                if (res.succeed == true) {
                    Toast(i + "成功!");
                    history.back(-1);
                } else {
                    Toast(i + "失败!");
                }
            });
        },
        onTokenChange(val) {
            //监听上传组件内token的变化
            this.token = val;
            console.log(this.token);
        },
        //学年
        XXXN() {
            this.showpopupXXXN = true;
            Get(api.getDic, {
                type: "XN"
            }).then(res => {
				
				// 判断是否已经加载过
				if(this.XXXNLIST!=''){
					return 
				}
                res.datas.code.rows.forEach((val, index) => {
                    this.XXXNLIST.push({
                        text: val.name,
                        stepid: val.id
                    });
                });
            });
        },
        QDXXXN(value, index) {
            this.XXXNType = value.text;
            this.XXXNId = value.stepid;
            this.showpopupXXXN = false;
        },
        QXXXXN() {
            this.showpopupXXXN = false;
        },
        //学期
        XXXQ() {
            this.showpopupXXXQ = true;
            Get(api.getDic, {
                type: "XQ"
            }).then(res => {
				// 判断是否已经加载过
				if(this.XXXQLIST!=''){
					return 
				}
                res.datas.code.rows.forEach((val, index) => {
                    this.XXXQLIST.push({
                        text: val.name,
                        stepid: val.id
                    });
                });
            });
        },
        QDXXXQ(value, index) {
            this.XXXQType = value.text;
            this.XXXQId = value.stepid;
            this.showpopupXXXQ = false;
        },
        QXXXXQ() {
            this.showpopupXXXQ = false;
        },
        //原因
        XXYY() {
            this.showpopupXXYY = true;
            Get(api.getDic, {
                type: "XXYY"
            }).then(res => {
				// 判断是否已经加载过
				if(this.XXYYLIST!=''){
					return 
				}
                res.datas.code.rows.forEach((val, index) => {
                    this.XXYYLIST.push({
                        text: val.name,
                        stepid: val.id
                    });
                });
            });
        },
        QDXXYY(value, index) {
            this.XXYYType = value.text;
            this.XXYYId = value.stepid;
            this.showpopupXXYY = false;
        },
        QXXXYY() {
            this.showpopupXXYY = false;
        }
    }
};
</script>
          
        