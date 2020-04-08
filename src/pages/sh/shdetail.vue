<template>
	<div>
		<div class="sqxx-container">
			<div class="sqxx-title">申请信息</div>
			<div class="sqxx-detial">
				<div>
					姓名
					<span>{{ userobj.XM }}</span>
				</div>
				<div>
					学号
					<span>{{ userobj.XH }}</span>
				</div>
				<div>
					学院名称
					<span>{{ userobj.XY }}</span>
				</div>
				<div>
					班级名称
					<span>{{ userobj.BJ }}</span>
				</div>
				<div>
					休学学年
					<span>{{ userobj.XXXN }}</span>
				</div>
				<div>
					休学学期
					<span>{{ userobj.XXXQ }}</span>
				</div>
				<div>
					本人电话
					<span>{{ userobj.BRDH }}</span>
				</div>
				<div>
					父母姓名
					<span>{{ userobj.FMXM }}</span>
				</div>
				<div>
					父母电话
					<span>{{ userobj.FMDH }}</span>
				</div>
				<div>
					休学原因
					<span>{{ userobj.FMDH }}</span>
				</div>
				<div>
					申请时间
					<span>{{ userobj.SQSJ }}</span>
				</div>
				<div>
					邮寄地址
					<span>{{ userobj.YJDZ }}</span>
				</div>
				<div>
					备注
					<span>{{ userobj.BZ }}</span>
				</div>
				<div>
					附件
					<span>暂无附件</span>
				</div>
			</div>
		</div>
		<div class="sqxx-title">申请进度</div>
		<mt-layout-container class="cjas0bjrs">
			<mt-steps direction="vertical" selected="Step_1" class="OCjauorbi2">
				<mt-step
					:status="value.type == '终止' ? 'finish' : value.type == '完成' ? 'finish' : ''"
					class="bh-color-gray-3 OCjaunjp1h OTjavtlivg OPjch2enhjg"
					v-for="(value, index) in LC"
					:key="index"
				>
					<!-- 提交申请 -->
					<mt-text type="default" class="OCjaunjp1zz">{{ value.name }}</mt-text>
					<mt-text type="default" slot="left" class="bh-color-gray-4 OCjaunjp1xp">{{ value.startTime }}</mt-text>
				</mt-step>
			</mt-steps>
		</mt-layout-container>
		<div style="position: relative;margin-top:10px;" v-cloak  v-if="states==''">
			<mt-button type="danger" size="large" @click="Agree(ag1)">不通过</mt-button>
			<mt-button type="primary" size="large" class="anniu" @click="Agree(ag2)">通过</mt-button>
		</div>
	</div>
</template>

<script>
import { Toast } from 'bh-mint-ui2';
import { Get, Post } from '../../utils';
import api from '../../api';
import moment from 'moment';
export default {
	name: 'shdetail',
	data: function() {
		return {
			zt1: '保存草稿',
			zt2: '提交',
			userobj: {},
			//
			showpopupXXXN: false,
			XXXNType: '',
			XXXNId: '',
			XXXNLIST: [],
			//
			showpopupXXXQ: false,
			XXXQType: '',
			XXXQId: '',
			XXXQLIST: [],
			//
			BRDH: '',
			FMXM: '',
			FMDH: '',
			//
			showpopupXXYY: false,
			XXYYType: '',
			XXYYId: '',
			XXYYLIST: [],
			//
			YJDZ: '',
			//
			token: '', //1509007813804371
			host: location.origin,
			hostPathname: location.origin + location.pathname.substring(0, location.pathname.indexOf('/', 1)),
			commandType: '',
			execute: '',
			id: '',
			ag1: '不通过',
			ag2: '通过',
			LC: '',
			arr: [],
			states:''
		};
	},
	methods: {
		//获取流程
		getlc() {
			let that=this;
			Get(api.queryFlowState, {
				taskId: this.$route.query.TASKID,
				responseType: 'JSON'
			}).then(res => {
				console.log(res);
				that.LC = res;
				// console.log(that.LC[2].type)
				that.states=that.LC[2].type
			});
			
			
		},
		Agree(ag) {
			//不通过
			if (ag == 'ag1') {
				this.$router.push({
					name: 'shtianxie',
					query: {
						WID: this.$route.query.WID,
						agree: this.ag1,
						TASKID: this.$route.query.TASKID
					}
				});
			} else {
				this.$router.push({
					name: 'shtianxie',
					query: {
						WID: this.$route.query.WID,
						agree: this.ag2,
						TASKID: this.$route.query.TASKID
					}
				});
			}
		}
	},
	created() {
		//获取流程
		this.getlc();
		//获取详情信息
		Get(api.queryDetailFormModel, {
			WID: this.$route.query.WID
		}).then(res => {
			this.userobj = res.datas.queryDetailFormModel.rows[0];
		});
		Get(api.queryDetailFjModel, {
			WID: this.$route.query.WID
		}).then(res => {
			this.token = res.datas.queryDetailFjModel.rows[0].FJSC;
		});
	},
	mounted() {}
};
</script>

<style scoped>
.sqxx-container {
	font-weight: bolder;
	font-size: 12px;
	line-height: 20px;
}
.sqxx-title {
	background-color: gainsboro;
	font-weight: normal;
	color: gray;
	padding-left: 20px;
	font-size: 12px;
	line-height: 25px;
}
.sqxx-container span {
	display: inline-block;
	position: absolute;
	left: 90px;
	font-weight: normal;
}
.sqxx-detial {
	padding-left: 20px;
	margin-top: 10px;
	margin-bottom: 10px;
}
.mint-button--large {
	width: 50%;
}
.anniu {
	position: absolute;
	right: 0;
	top: 0;
}
</style>
