<template>
	<div class="page-loadmore">
		<div class="page-loadmore-wrapper" id="s" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore
				:bottom-method="loadBottom"
				:top-method="loadTop"
				@bottom-status-change="handleBottomChange"
				:bottom-all-loaded="allLoaded"
				ref="loadmore"
				:autoFill="false"
			>
				<div class="item_wrap">
					<div class="list" @click="godetail(item.WID, item.TASKID, item.SHZT)" v-for="(item, index) in datalist" :key="index">
						<p>{{ item.XM }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.SQSJ }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
						<span class="zt" v-if="item.SHZT == 'termination'" style="color:red">{{ item.SHZT_DISPLAY }}</span>
						<span class="zt" v-else style="color:#52C7CA">{{ item.SHZT_DISPLAY }}</span>
						<p>休学学年：{{ item.XXXN_DISPLAY }}</p>
						<p>休学学期：{{ item.XXXQ_DISPLAY }}</p>
						<p>休学原因：{{ item.XXYY_DISPLAY }}</p>
						<p>邮寄地址：{{ item.YJDZ }}</p>
					</div>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
					<span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
				</div>
			</mt-loadmore>
		</div>
		<mt-fixed-button position="bottom-right" @click="TX()">+</mt-fixed-button>
	</div>
</template>
<script type="text/babel">
import { Toast } from 'bh-mint-ui2';
import { Get, Post } from '../../utils';
import api from '../../api';
export default {
	data() {
		return {
			selected: '1',
			pageNum: 1,
			datalist: [],
			allLoaded: false,
			bottomStatus: '',
			wrapperHeight: 0,
			dispatchid: ''
		};
	},
	components: {},
	methods: {
		TX() {
			this.$router.push({
				name: 'tianxie',
				query: {}
			});
		},
		godetail(WID, TASKID, SHZT) {
			if (SHZT == 'draft') {
				this.$router.push({
					name: 'draft',
					query: {
						WID: WID,
						TASKID: TASKID
					}
				});
			} else {
				this.$router.push({
					name: 'sqdetail',
					query: {
						WID: WID,
						TASKID: TASKID
					}
				});
			}
		},
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
		getdata() {
			Get(api.queryUserTasks, {
				taskType: 'ALL_TASK',
				nodeId: 'usertask1,usertask5',
				appName: 'pubdzxxsqapp',
				module: 'modules',
				page: 'sq',
				action: 'queryApplyListModel',
				pageSize: 10,
				pageNumber: this.pageNum
			}).then(res => {
				console.log(res);
				let data = res.datas.queryUserTasks.rows;
				if (!data.length || data.length < 10) {
					this.allLoaded = true;
				}
				if (data.length) {
					data.forEach(item => {
						this.datalist.push(item);
					});
				}
			});
		},
		loadTop() {
			this.pageNum = 1;
			this.datalist = [];
			this.getdata();
			this.$refs.loadmore.onTopLoaded();
		},
		loadBottom() {
			setTimeout(() => {
				this.pageNum++;
				this.getdata();
				this.$refs.loadmore.onBottomLoaded();
			}, 1000);
		}
	},
	created() {
		this.getdata();
	},
	mounted() {
		if (/iphone/gi.test(navigator.userAgent) && screen.height == 812 && screen.width == 375) {
			this.wrapperHeight = '690';
			var arr = document.getElementsByClassName('page-loadmore-wrapper');
			arr[0].classList.add('active');
		} else {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
		global.SDK.setTitleText('休学申请');
	}
};
</script>

<style scoped>
@component-namespace page {
	@component loadmore {
		@descendent desc {
			text-align: center;
			color: #666;
			padding-bottom: 5px;
			&:last-of-type {
				border-bottom: solid 1px #eee;
			}
		}
		@descendent listitem {
			height: 50px;
			line-height: 50px;
			border-bottom: solid 1px #eee;
			text-align: center;
			&:first-child {
				border-top: solid 1px #eee;
			}
		}
		@descendent wrapper {
			overflow: scroll;
		}
		.mint-spinner {
			display: inline-block;
			vertical-align: middle;
		}
	}
}
@component mint-loadmore-bottom {
	span {
		display: inline-block;
		transition: 0.2s linear;
		vertical-align: middle;
		@when rotate {
			transform: rotate(180deg);
		}
	}
}
.list {
	font-size: 14px;
	border-bottom: 1px dashed #bfbfbf;
	margin: 5px 0px 10px 0px;
	padding-bottom: 10px;
	background: #fff;
	position: relative;
}
.list > p {
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
}
.zt {
    position: absolute;
    right: 10px;
    top: 2px;
    display: inline-block;
    width: 90px;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
    text-align: right;
}
</style>
