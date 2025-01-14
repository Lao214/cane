<template>
    <div>
       ”欢迎回来“
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