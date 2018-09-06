let url={
    hotLists:'index/hotLists',
    banner:'index/banner',
    topList:'category/topList',
    subList:'category/subList',
    rank:'category/rank',
    searchList:'search/list',
    details:'goods/details',
    deal:'goods/deal',
    evaluation:'goods/evaluation',
    addCart:'cart/add',
    updateCart:'cart/update',
    listCart:'cart/list',
    reduceCart:'cart/reduce',
    removeCart:'cart/remove',
    mrremoveCart:'cart/mrremove',
}

let host='http://rap2api.taobao.org/app/mock/7058/'    
for (const key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host+url[key];
    }
}
export default url