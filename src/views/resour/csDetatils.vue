<template>
    <div class="body">
        <h1>{{ caneObj.caneName }}</h1>

        <el-tabs tab-position="left" style="min-height: 500px;">
            <el-tab-pane label="品种抗寒模块">
                <div class="toolbody">
                    <div class="toolbod-left">
                        <div class="base-info">
                            <h2>品种抗寒级别</h2>
                            <div class="info-item">
                                <span class="info-label" style="width: 48%;">抗寒级别</span> 
                                <span>{{ caneObj.resistanceLevel }}</span> 
                            </div>
                            <h2>表型组学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">毛状体</span> 
                                    <span>{{ caneObj.trichome }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">芽型</span> 
                                    <span>{{ caneObj.budType }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">茎</span> 
                                    <span>{{ caneObj.stem }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">叶鞘</span> 
                                    <span>{{ caneObj.leafSheath }}</span> 
                                </div>
                            </div>

                            <h2>细胞学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">表层细胞</span> 
                                    <span>{{ caneObj.epidermalCells }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">楚质层、角质层</span> 
                                    <span>{{ caneObj.cuticleStratumCorneum }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">硅细胞</span> 
                                    <span>{{ caneObj.siliconCell }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">栓细胞</span> 
                                    <span>{{ caneObj.thrombocytes }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">叶绿体</span> 
                                    <span>{{ caneObj.chloroplast }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">线粒体</span> 
                                    <span>{{ caneObj.mitochondria }}</span> 
                                </div>
                            </div>

                            <h2>生理生化指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">抗逆性化学物质</span> 
                                    <span>{{ caneObj.stressResistantChemicals }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">抗逆性酶</span> 
                                    <span>{{ caneObj.stressResistanceEnzyme }}</span> 
                                </div>
                            </div>

                            <h2>基因指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">相关基因</span> 
                                    <span>{{ caneObj.relatedGenes }}</span> 
                                </div>
                            </div>

                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">调控方案</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.controlPlan }}
                                </div>
                            </div>
                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">参考文献</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.references }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="品种抗旱模块">
                <div class="toolbody">
                    <div class="toolbod-left">
                        <div class="base-info">
                            <h2>品种抗旱级别</h2>
                            <div class="info-item">
                                <span class="info-label" style="width: 48%;">抗旱级别</span> 
                                <span>{{ caneObj.resistanceLevelHan }}</span> 
                            </div>
                            <h2>表型组学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">毛状体</span> 
                                    <span>{{ caneObj.trichomeHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">芽型</span> 
                                    <span>{{ caneObj.budTypeHan  }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">茎</span> 
                                    <span>{{ caneObj.stemHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">叶鞘</span> 
                                    <span>{{ caneObj.leafSheathHan  }}</span> 
                                </div>
                            </div>

                            <h2>细胞学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">表层细胞</span> 
                                    <span>{{ caneObj.epidermalCellsHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">楚质层、角质层</span> 
                                    <span>{{ caneObj.cuticleStratumCorneumHan  }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">硅细胞</span> 
                                    <span>{{ caneObj.siliconCellHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">栓细胞</span> 
                                    <span>{{ caneObj.thrombocytesHan  }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">叶绿体</span> 
                                    <span>{{ caneObj.chloroplastHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">线粒体</span> 
                                    <span>{{ caneObj.mitochondriaHan  }}</span> 
                                </div>
                            </div>

                            <h2>生理生化指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">抗逆性化学物质</span> 
                                    <span>{{ caneObj.stressResistantChemicalsHan  }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">抗逆性酶</span> 
                                    <span>{{ caneObj.stressResistanceEnzymeHan  }}</span> 
                                </div>
                            </div>

                            <h2>基因指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">相关基因</span> 
                                    <span>{{ caneObj.relatedGenesHan  }}</span> 
                                </div>
                            </div>

                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">调控方案</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.controlPlanHan  }}
                                </div>
                            </div>
                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">参考文献</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.referencesHan  }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="抗黑穗病模块">
                <div class="toolbody">
                    <div class="toolbod-left">
                        <div class="base-info">
                            <h2>品种抗黑穗病级别</h2>
                            <div class="info-item">
                                <span class="info-label" style="width: 48%;">抗黑穗病级别</span> 
                                <span>{{ caneObj.resistanceLevelHei }}</span> 
                            </div>
                            <h2>表型组学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">毛状体</span> 
                                    <span>{{ caneObj.trichomeHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">芽型</span> 
                                    <span>{{ caneObj.budTypeHei }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">茎</span> 
                                    <span>{{ caneObj.stemHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">叶鞘</span> 
                                    <span>{{ caneObj.leafSheathHei }}</span> 
                                </div>
                            </div>

                            <h2>细胞学指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;">
                                <div class="info-item">
                                    <span class="info-label">表层细胞</span> 
                                    <span>{{ caneObj.epidermalCellsHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">楚质层、角质层</span> 
                                    <span>{{ caneObj.cuticleStratumCorneumHei }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">硅细胞</span> 
                                    <span>{{ caneObj.siliconCellHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">栓细胞</span> 
                                    <span>{{ caneObj.thrombocytesHei }}</span> 
                                </div>

                                <div class="info-item">
                                    <span class="info-label">叶绿体</span> 
                                    <span>{{ caneObj.chloroplastHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">线粒体</span> 
                                    <span>{{ caneObj.mitochondriaHei }}</span> 
                                </div>
                            </div>

                            <h2>生理生化指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">抗逆性化学物质</span> 
                                    <span>{{ caneObj.stressResistantChemicalsHei }}</span> 
                                </div>
                                <div class="info-item">
                                    <span class="info-label">抗逆性酶</span> 
                                    <span>{{ caneObj.stressResistanceEnzymeHei }}</span> 
                                </div>
                            </div>

                            <h2>基因指标</h2>
                            <div style="display: flex;width: 100%;justify-content: space-between;flex-wrap: wrap;margin-bottom: 3rem;">
                                <div class="info-item">
                                    <span class="info-label">相关基因</span> 
                                    <span>{{ caneObj.relatedGenesHei }}</span> 
                                </div>
                            </div>

                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">调控方案</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.controlPlanHei }}
                                </div>
                            </div>
                            <div class="info-text">
                                <el-divider content-position="left"><span style="font-size: 1.4rem;">参考文献</span></el-divider>
                                <div class="info-content">
                                    {{ caneObj.referencesHei }}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import caneSensitivity from '@/api/caneSensitivity.js';

export default {
    data() {
        return {
            caneObj: {},
            toolTitle: this.$route.query.tolname,
        }
    },
    mounted() {
        this.viewCane()
        this.getCane()
    },
    methods: {
        viewCane() {
            const cane = {
                id: this.$route.query.caneId
            }
            caneSensitivity.viewCane(cane).then(res => {
                if(res.code === 200) {
                    
                }
            })
        },
        search() {
            this.$router.push({
                path: '/resours',
                query: {
                    skword: this.keyword
                }
            })
        },
        goHome() {
            this.$router.push('/home')
        },
        goResours() {
            this.$router.push('/resours')
        },
        getCane() {
            caneSensitivity.getCaneById(this.$route.query.caneId).then(res => {
                if(res.code === 200) {
                    this.caneObj = res.data.data
                }
            })
        } 
    }
}
</script>

<style scoped>
.body {
  padding-top: 114px;
  padding-bottom: 4rem;
  margin: 0 5vw;
  background: white;
}

.toolbody {
    display: flex;
    justify-content: space-between;
    min-height: 640px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.toolbod-left {
    width: 71vw;
    text-align: left;
    /* border:1px solid #cecece; */
    padding: 10px;
}

.info-label {
    width: 28%;
    margin-right: 5%;
    color: #a8a8a8;
    font-weight: 500;
}

.info-item {
    display: flex;
    width: 49%;
    border-bottom: 1px #a8a8a8 dashed;
    margin-bottom: .7rem;
}

.info-text {
    /* margin: 1rem; */
}

.info-content {
    min-height: 2rem;
}
</style>