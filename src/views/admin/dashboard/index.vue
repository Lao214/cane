<template>
    <div>
        <!-- <button @click="getInfo()">getInfo</button> -->
    </div>
</template>

<script>
import { getInfo } from '@/api/userApi'

export default {
    methods: {
        getInfo() {
            getInfo().then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>