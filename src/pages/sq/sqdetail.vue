<template>
	<div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1" componentname="navber">申请信息</mt-tab-item>
			<mt-tab-item id="2" componentname="navber">附件列表</mt-tab-item>
			<mt-tab-item id="3" componentname="navber">流程信息</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<mt-cell-group>
					<mt-field label="姓名" v-model="datail.XM" readonly></mt-field>
					<mt-field label="学号" v-model="datail.XH" readonly></mt-field>
					<mt-field label="学院名称" v-model="datail.XY" readonly></mt-field>
					<mt-field label="班级名称" v-model="datail.BJ" readonly></mt-field>
					<mt-field label="休学学年" v-model="datail.XXXN_DISPLAY" readonly></mt-field>
					<mt-field label="休学学期" v-model="datail.XXXQ_DISPLAY" readonly></mt-field>
					<mt-field label="本人电话" v-model="datail.BRDH" readonly></mt-field>
					<mt-field label="父母姓名" v-model="datail.FMXM" readonly></mt-field>
					<mt-field label="父母电话" v-model="datail.FMDH" readonly></mt-field>
					<mt-field label="休学原因" v-model="datail.XXYY_DISPLAY" readonly></mt-field>
					<mt-field label="申请时间" v-model="datail.SQSJ" readonly></mt-field>
					<mt-field label="邮寄地址" v-model="datail.YJDZ" readonly></mt-field>
					<mt-field label="编号" v-model="datail.BH" readonly></mt-field>
					<mt-field label="院部确认学生成绩" v-model="datail.XSCJ_DISPLAY" readonly></mt-field>
					<mt-field label="学籍卡是否打印留存" v-model="datail.XJK_DISPLAY" readonly></mt-field>
					<mt-field label="备注" v-model="datail.BZ" readonly type="textarea" rows="4"></mt-field>
				</mt-cell-group>
			</mt-tab-container-item>
			<!-- 附件 -->
			<mt-tab-container-item id="2">
				<div style="text-align: center;margin-top: 50px;">
					暂无附件信息
				</div>
			</mt-tab-container-item>
			<!-- 流程信息 -->
			<mt-tab-container-item id="3">
				<mt-steps direction="vertical" selected="Step_1" class="OCjauorbi2">
					<mt-step
						:status="value.type == '终止' ? 'finish' : value.type == '完成' ? 'finish' : ''"
						class="bh-color-gray-3 OCjaunjp1h OTjavtlivg OPjch2enhjg"
						v-for="(value, index) in LC"
						:key="index"
					>
						<mt-text type="default" class="OCjaunjp1zz">{{ value.name }}</mt-text>
						<mt-text type="default" slot="left" class="bh-color-gray-4 OCjaunjp1xp">{{ value.startTime }}</mt-text>
					</mt-step>
				</mt-steps>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<style></style>
<style scoped>
.list1 {
	margin: 12px;
}
</style>
<script>
import { Toast } from 'bh-mint-ui2';
import { Get, Post } from '../../utils';
import api from '../../api';
export default {
	components: {},
	data() {
		return {
			datail: {},
			selected: '1',
			host: 'WEBPACK_CONFIG_HOST',
			fjobg: [],
			LC: []
		};
	},
	watch: {},
	created() {
		this.getdatail();
		this.getFJ();
		this.getlc();
	},
	mounted() {},
	methods: {
		//获取流程
		getlc() {
			Get(api.queryFlowState, {
				taskId: this.$route.query.TASKID,
				responseType: 'JSON'
			}).then(res => {
				console.log(res);
				this.LC = res;
			});
		},
		downfujian(item) {
			if (BH_MIXIN_SDK.bh && BH_MIXIN_SDK.bh.file && BH_MIXIN_SDK.bh.file.filePreview) {
				BH_MIXIN_SDK.bh.file.filePreview(encodeURI(item.fileUrl), item.name.split('.'[1]), item.name);
			} else {
				window.location.href = 'http://amptest.wisedu.com' + item.fileUrl;
			}
		},
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
				var url = WEBPACK_CONFIG_HOST + '/sys/emapcomponent/file/getUploadedAttachment/' + res.datas.queryDetailFjModel.rows[0].FJSC + '.do';
				Get(url, {}).then(res => {
					this.fjobg = res.items;
					console.log(this.fjobg)
				});
			});
		}
	}
};
</script>
