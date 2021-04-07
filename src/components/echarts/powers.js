import React from 'react';

import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
    }
    componentDidMount(){
       //this.init()
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.data
        },()=>{
            this.init()
        })
    }
    init(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainLine'));
        // 绘制图表
        myChart.setOption({
            color: ['#08E0FC'],
            xAxis: {
                type: 'category',
                data: this.state.data.time,
                axisTick: {
                alignWithLabel: true,
                lineStyle: {color: '#1b8383'}
                },
                axisLine: {// 刻度线样式
                lineStyle: {
                    color: '#1b8383',
                    width: 1
                }
                },
                axisLabel: {
                formatter: '{value}',
                textStyle: { // 改变刻度字体样式
                    color: '#fff'
                }
                }
            },
            yAxis: {
                type: 'value',
                name: this.state.data.title+'（kw）',
                position: 'right',
                nameTextStyle: {
                color: '#fff',
                fontFamily: 'STHeitiSC-Medium',
                fontSize: 12
                },
                axisLabel: {
                formatter: '{value}',
                textStyle: { // 改变刻度字体样式
                    color: '#fff'
                }
                },
                axisLine: {// 刻度线样式
                lineStyle: {
                    color: '#1b8383',
                    width: 1
                }
                },
                axisTick: {
                lineStyle: {color: '#1b8383'}
                },
                splitLine: {// 网格线
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#1b8383']
                }
                }
            },

            grid: {
                left: 0,
                bottom: 0,
                right: '4%', // 与容器右侧的距离
                containLabel: true
            },
            series: [{
                data: this.state.data.data,
                type: 'line',
                markPoint: {
                data: [{
                    name: '最大值',
                    type: 'max'
                }, {
                    name: '最小值',
                    type: 'min'
                }]
                }
            }]
        });
    }
    render() {
        const styl={
            text:{
                position: 'absolute',
                top:'10px',
                left:0,
                fontFamily:'PingFangSC-Semibold',
                fontSize:'14px',
                color:'#eeeeee'
            },
            img:{
                verticalAlign:'sub'
            }
        }
        return (
            <div style={{position:'relative'}}>
                <div id="mainLine" style={{width:340,height:200}}></div>
                <div className="text-icon" style={styl.text}>
                    <img src={require("../../image/echartIcon.png")} style={styl.img} alt=""/>
                    <span>近六小时{this.state.data.title}统计</span>
                </div>
            </div>
        );
    }
}