import Foot from 'components/Foot.vue'

let mixin={
    filters: {
        adjust(price) {
            let oldVal = new Number(price)
            if (oldVal || oldVal === 0) {
                let newVal = (price).toFixed(2)
                return newVal
            }
        }
    }, 
    components: {
        Foot
    },
}

export default mixin