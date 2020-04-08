<template>
	<div>
		<div class="tittle">
		    <span style="color:red">*</span>&nbsp;院部确认学生成绩
		</div>
		<mt-box-group v-model="value">
		    <mt-cell-group>
		        <mt-radiobox
		            :name="item.value"
		            v-for="item in options"
		            :key="item.value"
		            :disabled="item.disabled"
		            @radiobox-click="blank"
		            required
		        >{{item.label}}</mt-radiobox>
		    </mt-cell-group>
		</mt-box-group>
		<div class="tittle">
		    <span style="color:red">*</span>&nbsp;学籍卡是否打印留存
		</div>
		<mt-box-group v-model="value1">
		    <mt-cell-group>
		        <mt-radiobox
		            :name="item.value"
		            v-for="item in options1"
		            :key="item.value"
		            :disabled="item.disabled"
		            @radiobox-click="blank1"
		            required
		        >{{item.label}}</mt-radiobox>
		    </mt-cell-group>
		</mt-box-group>
		<mt-cell-group>
		    <mt-field label="备注" v-model="BZ" placeholder="请填写" type="textarea" rows="4"></mt-field>
		    <mt-field
		        label="审核意见"
		        v-model="SHYJ"
		        placeholder="请填写"
		        required
		        type="textarea"
		        rows="4"
		    ></mt-field>
		   <div class="bh-clearfix cell">
		        <div class="fj">审核附件：</div>
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

			<mt-button  type="primary" size="large"  @click="sure()" class="surebtn">确定</mt-button>


	</div>
</template>

<script>
import { Toast } from "bh-mint-ui2";
import { Get, Post } from "../../utils";
import api from "../../api";	
export default {
  name: '',
  data: function () {	
    return {
	datail:[],
	fjobg:'',
	fileToken:'',
	agree:"",
	id:"",//院部确认是否
	id1:"",//学籍卡是否打印
	BZ:"",
	SHYJ:"",	
	value: "",
	options: [],
	value1: "",
	options1: [],
	host: "WEBPACK_CONFIG_HOST",// host: location.origin,
	token: "",
	hostPathname:
	    location.origin +
	    location.pathname.substring(
	        0,
	        location.pathname.indexOf("/", 1)
	    ),
    }
  },
  methods: {
	 getdatail() {
	     Get(api.queryDetailFormModel, {
	         WID: this.$route.query.WID
	     }).then(res => {
	         this.datail = res.datas.queryDetailFormModel.rows[0];
	     });
	 },
	 getFJ() {
	     Get(api.queryDetailFjModel, {
	         WID: this.$route.query.WID
	     }).then(res => {
	         var url =
	             WEBPACK_CONFIG_HOST +
	             "/sys/emapcomponent/file/getUploadedAttachment/" +
	             res.datas.queryDetailFjModel.rows[0].FJSC +
	             ".do";
	         Get(url, {}).then(res => {
	             this.fjobg = res.items;
	             this.fileToken = res.fileToken;
	         });
	     });
	 },
	onTokenChange(val) {
	    //监听上传组件内token的变化
	    this.token = val;
	    console.log(this.token);
	},
	sure(){
		if (this.value == "") {
		    Toast("请确认学生成绩");
		    return;
		}
		if (this.value1 == "") {
		    Toast("请选择学籍卡是否打印留存");
		    return;
		}
		if (this.SHYJ == "") {
		    Toast("请填写审核意见");
		    return;
		}
		let newobj = {
		    WID: this.datail.WID,
		    CZZ: this.datail.CZZ,
		    CZZXM: this.datail.CZZXM,
		    CZRQ: this.datail.CZRQ,
		    XM: this.datail.XM,
		    XH: this.datail.XH,
		    XYDM: this.datail.DWDM,
		    XY: this.datail.DWMC,
		    BJDM: this.datail.BH,
		    BJ: this.datail.BJMC,
		    XXXN_DISPLAY: this.datail.BJMC,
		    XXXN: this.datail.BJMC,
		    XXXQ_DISPLAY: this.datail.XXXN_DISPLAY,
		    XXXQ: this.datail.XXXQ,
		    BRDH: this.datail.BRDH,
		    FMXM: this.datail.FMXM,
		    FMDH: this.datail.FMDH,
		    XXYY_DISPLAY: this.datail.XXYY_DISPLAY,
		    XXYY: this.datail.XXYY,
		    SQSJ: this.datail.SQSJ,
		    YJDZ: this.datail.YJDZ,
		    FJSC: this.fileToken ? this.fileToken : "",
		    XSCJ_DISPLAY: this.value,
		    XSCJ: this.id,
		    XJK_DISPLAY: this.value1,
		    XJK: this.id1,
		    BZ: this.BZ,
		    BH: this.datail.BH,
		    FJ: this.token,
		    SHYJ: this.SHYJ
		};
		
		if(this.agree=="不通过"){
			Get(api.terminateInstance, {
			    formData: newobj,
			    id: "termination",
			    commandType: "termination",
			    execute: "do_termination",
			    name: "否决",
			    action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
			    commandEvent:
			        "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
			    url: "/sys/emapflow/tasks/terminateInstance.do",
			    taskId: this.$route.query.TASKID,
			    defKey: "pubdzxxsqapp.xxFlow",
			    flowComment: this.SHYJ
			}).then(res => {
			    if (res.succeed == true) {
			        Toast("审核不通过成功!");
			        history.back(-1);
			    } else {
			        Toast("审核不通过失败!");
			    }
			});
		}
		else{
			Get(api.execute, {
			    formData: newobj,
			    id: "submit",
			    commandType: "submit",
			    execute: "do_submit",
			    name: "通过",
			    action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
			    commandEvent:
			        "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
			    url: "/sys/emapflow/tasks/execute.do",
			    buttonType: "primary",
			    disabled: true,
			    taskId: this.$route.query.TASKID,
			    defKey: "pubdzxxsqapp.xxFlow",
			    flowComment: this.SHYJ
			}).then(res => {
			    if (res.succeed == true) {
			        Toast("审核通过成功!");
			       history.go(-2);
			    } else {
			        Toast("审核通过失败!");
			    }
			});
		}
		
		
		
	},
	blank(e, val) {
	    this.id = val
		console.log(val, "你点击了！");
	},
	blank1(e, val) {
	    this.id1 = val
		console.log(val, "你点击了！")
	},
  },
  created () {
	  this.getdatail()
	  this.getFJ()
	 this.agree=this.$route.query.agree;
	Get(api.getDic, {
	    type: "SFXSCJ"
	}).then(res => {
	    res.datas.code.rows.forEach((val, index) => {
	        this.options.push({
	            label: val.name,
	            value: val.id
	        });
	    });
	});
	Get(api.getDic, {
	    type: "SFXJK"
	}).then(res => {
	    res.datas.code.rows.forEach((val, index) => {
	        this.options1.push({
	            label: val.name,
	            value: val.id
	        });
	    });
	});
  },
 

  mounted () {

  }
}
</script>

<style scoped>
.mint-button--large {
    width: 50%;
}
.anniu1 {
    position: fixed;
    left: 0;
    bottom: 0;
}
.anniu {
    position: fixed;
    right: 0;
    bottom: 0;
}
.list > p > span {
    color: #52c7ca;
}
.list > p {
    padding: 8px 10px;
    font-size: 14px;
}
.list {
    margin: 10px;
    border: 1px solid #b0b0b2;
    border-radius: 5px;
}
.tittle {
    background: #fff;
    padding: 10px 12px;
}
.list1 {
    margin: 12px;
}
.surebtn{
	width: 80%;
	margin: 10px auto;
	
}
</style>
