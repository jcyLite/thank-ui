<template>
    <div id="signin">
        <div class="signin" v-show="pageShow==='signHome'">
            <mt-header fixed title="外勤签到">
                <router-link :to="homeType" slot="left" @click.native="clearBackButton"><span icon="back">返回</span></router-link>
                <router-link to="" slot="right" @click.native="changePage('signList');showSignList(1);">历史签到</router-link>
            </mt-header>
            <div class="pt">
                <time>{{currentTime}}</time>
                <div class="address">
                    <span>{{address}}</span>
                    <i @click="getLocation()"></i>
                </div>
                <div id="hv-baidu-map-container"></div>
                <div class="photo">
                    <h2>拍照<span>(<i>{{this.image.length}}</i>/2)</span></h2>
                    <div class="photoWrapper">
                        <div class="imgWrapper" v-for="(o, index) in image" :key="index">
                            <img @click="viewBigImg(o, false)" :src="o" alt=""><del @click="delPhoto(index)"></del>
                        </div>
                        <span v-show="this.image.length!==2" icon="photocam" @click="startPhoto"></span>
                    </div>
                </div>
                <div class="signIn" @click="submit">签到</div>
            </div>
            <div v-show="bigImgShow" :style="windowSize" class="bigImgWrapper">
                <img :src="bigImgSrc" alt="" @click="bigImgShow=!bigImgShow;bigImgSrc=''">
            </div>
        </div>
        <div class="signList" v-show="pageShow==='signList'">
            <mt-header fixed title="历史签到">
                <router-link to="" slot="left" @click.native="changePage('signHome')"><span icon="back">返回</span></router-link>
            </mt-header>
            <div class="pt">
                <div class="signListWrapper" v-show="!noData">
                    <router-link to='' class="list" @click.native="getSignDetail(o);" v-for="(o, idx) in signListCont" :key="idx">
                        <listRow rowType="arrow" icon="icon-nav-1.png">
                            <h2>{{o.signAddress}}</h2>
                            <h3>{{o.signTime+' '+o.signWeek}}</h3>
                        </listRow>
                    </router-link>
                </div>
                <no-data :show="noData"></no-data>
            </div>
        </div>
        <div class="signDetail" v-show="pageShow==='signDetail'">
            <mt-header fixed title="历史签到详情">
                <router-link to="" slot="left" @click.native="changePage('signList')"><span icon="back">返回</span></router-link>
            </mt-header>
            <div class="pt">
                <time>{{time2}}</time>
                <div class="address">
                    <span>{{address2}}</span>
                </div>
                <div id="hv-baidu-map-container2"></div>
                <div class="photo">
                    <h2>照片<span v-if="false">(<i>{{this.image2.length}}</i>/2)</span></h2>
                    <div class="photoWrapper">
                        <div class="imgWrapper" v-for="(o, index) in image2" :key="index">
                            <img @click="viewBigImg(o, true)" :src="o.thumbnailPath | handleUrl" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="bigImgShow" :style="windowSize" class="bigImgWrapper">
                <img :src="bigImgSrc" alt="" @click="bigImgShow=!bigImgShow;bigImgSrc=''">
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    var moment = require('moment')
    import listRow from '../components/listRow.vue'
    import noData from '../components/noData.vue'
    import {
        accessRecord,
        saveSign,
        getSignList,
        uploadByBase64,
        getFileByForeignkey
    } from '../data/getData'
    import {Indicator, Toast} from 'mint-ui'
    import {baseUrl} from '../data/env'
    import {
        hndsDirectory,
        hndsDirectoryPath
    } from '../common/common'

    export default {
        name: 'signin',
        components: {
            listRow, noData
        },
        data () {
            return {
                homeType: '/home',
                noData: false,
                pageShow: 'signHome',
                currentTime: '',
                address: '正在获取您的当前位置...',
                address2: '',
                center: {lng: 110.2048317258, lat: 20.0497739066},
                point: {lng: 0, lat: 0},
                signListCont: {},
                time: '',
                time2: '',
                image: [],
                image2: [],
                windowSize: {},
                bigImgShow: false,
                bigImgSrc: ''
            }
        },
        methods: {
            getHomePage () {
                var type = localStorage.getItem('homeType')
                if (type) {
                    this.homeType = type
                }
                this.windowSize.width = window.innerWidth + 'px'
                this.windowSize.height = window.innerHeight + 'px'
                this.windowSize.lineHeight = window.innerHeight + 'px'
            },
            changePage (page) {
                if (page === 'signList') {
                    document.getElementById('hv-baidu-map-container2').innerHTML = ''
                    this.image2 = []
                    this.time2 = ''
                    this.address2 = ''
                }
                this.pageShow = page
            },
            getBaiduMap (lng, lat) {
                var point = new BMap.Point(lng, lat)
                var map = new BMap.Map("hv-baidu-map-container2")
                var marker = new BMap.Marker(point)
                map.centerAndZoom(point, 18)
                map.addOverlay(marker)
            },
            getCurrentTime () {
                let time = moment().format('YYYY-MM-DD HH:mm:ss')
                this.currentTime = time
                var that = this
                setInterval(function () {
                    let time = moment().format('YYYY-MM-DD HH:mm:ss')
                    that.currentTime = time
                }, 500)
            },
            close () {
                this.dialog = false
            },
            getLocation () {
                Indicator.open({
                    text: '正在定位...',
                    spinnerType: 'fading-circle'
                })
                var that = this
                var lng = this.center.lng
                var lat = this.center.lat
                var map = new BMap.Map("hv-baidu-map-container")
                var point = new BMap.Point(lng, lat)
                map.centerAndZoom(point, 10)
                if (device.platform == 'Android') {
                // if (false) {
                    cordova.exec(function(e){
                        that.address = e.address
                        that.point = {
                            lng: e.longitude,
                            lat: e.latitude
                        }
                        var point0 = new BMap.Point(e.longitude, e.latitude)
                        var marker = new BMap.Marker(point0)   
                        map.centerAndZoom(point0, 18)
                        map.addOverlay(marker)
                        Indicator.close()
                    }, function(e){
                        Indicator.close()
                        that.address = '未获取到您的当前位置，请重试'
                    }, "MyLocationUtil", "getLocation", [])
                } else {
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var address = r.address.province + r.address.city + r.address.district + r.address.street + r.address.street_number
                            that.address = address
                            that.point = {
                                lng: r.point.lng,
                                lat: r.point.lat
                            }
                            var mk = new BMap.Marker(r.point)
                            map.centerAndZoom(r.point, 18)
                            map.addOverlay(mk)
                            Indicator.close()
                        } else {
                            Indicator.close()
                            that.address = '未获取到您的当前位置，请重试'
                        }        
                    })
                }
            },
            async submit () {
                if (this.image.length === 0) {
                    Toast('请拍照后再签到')
                    return
                }
                Indicator.open({
                    text: '正在签到...',
                    spinnerType: 'fading-circle'
                })
                let data = await saveSign(this.point.lng, this.point.lat, this.address, Vue.prototype.userId)
                if (data.code === 0) {
                    await accessRecord(Vue.prototype.loginId, '001002002')
                    this.upLoad(data.signId)
                } else {
                    Indicator.close()
                    Toast('签到失败')
                }
            },
            async showSignList (pageNum) {
                this.noData = false
                let data = await getSignList(pageNum, Vue.prototype.loginId)
                if (data.code === 0) {
                    await accessRecord(Vue.prototype.loginId, '001002001')
                    this.signListCont = data.datas
                } else if (data.code === 2) {
                    this.noData = true
                } else {
                    Toast('获取数据失败，请稍后再试')
                }
            },
            startPhoto () {
                var that = this
                navigator.camera.getPicture(that.successCallback, that.errrorCallback, {quality: 50, destinationType: Camera.DestinationType.DATA_URL})
            },
            successCallback (imageData) {
                let src = 'data:image/jpeg;base64,' + imageData
                this.image.push(src)
            },
            errrorCallback (message) {
                // message
            },
            delPhoto (e) {
                this.image.splice(e, 1)
            },
            onBackButton () {
                if (this.pageShow === 'signList') {
                    this.pageShow = 'signHome'
                } else if (this.pageShow === 'signDetail') {
                    if (this.bigImgShow) {
                        this.bigImgShow = false
                    } else {
                        this.pageShow = 'signList'
                    }
                } else {
                    if (this.bigImgShow) {
                        this.bigImgShow = false
                    } else {
                        this.$router.push(this.homeType)
                        this.clearBackButton()
                    }
                }
            },
            clearBackButton () {
                document.removeEventListener('backbutton', this.onBackButton, false)
            },
            async upLoad (e) {
                var newImgStr = [] 
                for (var i = 0; i < this.image.length; i++) {
                    var str1 = this.image[i].replace(/\+/g, '-')
                    var str = str1.replace(/=/g, '$')
                    newImgStr.push(str)
                }
                let imgStr = JSON.stringify(newImgStr)
                let data = await uploadByBase64(e, imgStr, 0, 1)
                if (data.code === 0) {
                    Toast('签到成功')
                    Indicator.close()
                    this.image = []
                } else {
                    Indicator.close()
                    Toast('签到失败')
                }
            },
            async getSignDetail (e) {
                this.pageShow = 'signDetail'
                this.time2 = e.signTime
                this.address2 = e.signAddress
                let id = e.id
                let res = await getFileByForeignkey(id)
                if (res.code === 0) {
                    let data = res.datas
                    for (var i = 0; i < data.length; i++) {
                        this.image2.push(data[i])
                    }
                } else if (res.code === 2) {
                    // 无数据
                } else {
                    Toast('获取图片失败')
                }
                this.getBaiduMap(e.addLongitude, e.addrLatitude)
            },
            viewBigImg (e, type) {
                if (type) {
                    if (device.platform == "Android") {
                        let src = baseUrl + '/' + e.filePath
                        this.bigImgSrc = src
                        this.bigImgShow = true
                    } else {
                        Indicator.open({
                            text: '请稍候...',
                            spinnerType: 'fading-circle'
                        })
                        var name = e.fileName
                        var src = hndsDirectoryPath + '/' + name
                        var that = this
                        hndsDirectory.getFile(name, {create:false, exclusive:false}, function(fileEntry){
                            // 存在文件
                            Indicator.close()
                            that.bigImgSrc = src
                            that.bigImgShow = true
                        }, function(){
                            // 不存在文件
                            var httpSrc = baseUrl + '/' + e.filePath
                            var uri = encodeURI(httpSrc)
                            var fileTransfer = new FileTransfer()
                            fileTransfer.download(
                                uri,
                                src,
                                function(entry) {
                                    Indicator.close()
                                    that.bigImgSrc = src
                                    that.bigImgShow = true
                                },
                                function(error) {
                                    Indicator.close()
                                    Toast("获取图片失败，请稍后再试")
                                },
                                false,
                                true
                            )
                        })
                    }
                } else {
                    this.bigImgSrc = e
                    this.bigImgShow = true
                }   
            }
        },
        created () {
            this.getHomePage()
            this.getCurrentTime()
            document.addEventListener('backbutton', this.onBackButton, false)
        },
        mounted () {
            this.getLocation()
        },
        filters: {
            handleUrl (e) {
                let src = e.replace(/\\/g, '/')
                return baseUrl + '/' + src
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/common.less";
    #hv-baidu-map-container,
    #hv-baidu-map-container2 {
        width: 16rem;
        height: 9.5rem;
    }
    time {
        display: block;
        width: 12.0rem;
        height: 1.5rem;
        line-height: 1.5rem;
        margin: 0.75rem auto 0;
        background-color: #1e82d2;
        text-align: center;
        color: #fff;
        border-radius: 20px;
    }
    .address {
        width: 13.25rem;
        line-height: 1rem;
        min-height: 2.6rem;
        padding: 0.8rem 0 0.8rem 1.75rem;
        margin: 0 auto;
        box-sizing: border-box;
        background: url(../assets/location.png) left center no-repeat;
        background-size: 1.0rem 1.0rem;
        overflow: hidden;
        position: relative;

        span {
            float: left;
            width: 9.75rem;
            text-align: justify;
        }

        i {
            .abs-middle;
            right: 0;
            display: inline-block;
            width: 1.0rem;
            height: 1.0rem;
            background: url(../assets/new.png) center center no-repeat;
            background-size: 100% auto;
        }
    }
    .photo {
        width: 14.75rem;
        margin: 0 auto;

        h2 {
            height: 1.5rem;
            line-height: 1.5rem;

            span {
                color: #888;

                i {
                    font-style: normal;
                }
            }
        }

        .photoWrapper {
            overflow: hidden;
            min-height: 4rem;
            margin-bottom: 0.75rem;
            padding-top:0.5rem;

            .imgWrapper {
                float: left;
                width: 3.375rem;
                height: 3.375rem;
                position: relative;
                margin-right: 0.3rem;

                img {
                    width: 3.2rem;
                    height: 3.2rem;
                    border-radius: 5px;
                }

                del {
                    background: url(../assets/del.png) center center / 0.8rem auto no-repeat;
                    width: 0.8rem;
                    height: 0.8rem;
                    position: absolute;
                    top: -0.3rem;
                    right: -0.2rem;
                }
            }
        }
    }
    .signIn {
        width: 14.75rem;
        height: 1.9rem;
        line-height: 1.9rem;
        background-color: #1e82d2;
        margin: 0 auto 0.75rem;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        font-size: 0.8rem;
    }
    .bigImgWrapper {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        z-index: 1000;
        display: table-cell;
        vertical-align: middle;

        img {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }
</style>
