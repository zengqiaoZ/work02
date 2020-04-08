import index from './pages/index.vue';
import SQ from './pages/sq/sq.vue';
import SH from './pages/sh/sh.vue';
import sqdetail from './pages/sq/sqdetail.vue';
import tianxie from './pages/sq/tianxie.vue';
import draft from './pages/sq/draft.vue';
import shdetail from './pages/sh/shdetail.vue';
import shtianxie from './pages/sh/shtianxie.vue';
export default {
    routes: [
        {
            path: '/',
            component: index,
            name:"index"
        },{
            path: '/SQ',
            component: SQ,
            name:"SQ"
        },{
            path: '/SH',
            component: SH,
            name:"SH"
        },{
            path: '/sqdetail',
            component: sqdetail,
            name:"sqdetail"
        },{
            path: '/tianxie',
            component: tianxie,
            name:"tianxie"
        },{
            path: '/draft',
            component: draft,
            name:"draft"
        },{
            path: '/shdetail',
            component: shdetail,
            name:"shdetail"
        },{
            path: '/shtianxie',
            component: shtianxie,
            name:"shtianxie"
        }
    ]
};