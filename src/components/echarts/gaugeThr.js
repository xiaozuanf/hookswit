import React from 'react';

import './gaugeThr.scss'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            active:1
        }
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.data,
            active:1
        },()=>{
            this.init()
        })
    }
    componentDidMount(){
        
    }
    changeGon(m){
        this.setState({
            active:m
        },()=>{
            this.init()
        })
    }
    init(){
        // 基于准备好的dom，初始化echarts实例
        let series=[]
        if(this.state.active==1){
            series=this.state.data.ua
        }
        if(this.state.active==2){
            series=this.state.data.ub
        }
        if(this.state.active==3){
            series=this.state.data.uc
        }
        if(this.state.active==4){
            series=this.state.data.ia
        }
        if(this.state.active==5){
            series=this.state.data.ib
        }
        if(this.state.active==6){
            series=this.state.data.ic
        }
        var myChart = echarts.init(document.getElementById('mainbars'));
        // 绘制图表
        myChart.setOption({
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: this.state.data.data,
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
                    // formatter: '{value}',
                    textStyle: { // 改变刻度字体样式
                    color: '#fff'
                    }
                }
                }
            ],
            yAxis: [
                {
                type: 'value',
                // name: '用电量（kw/h）',
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
                }
            ],
            series: [
                {
                name: '用电量（KW/H）',
                type: 'bar',
                barWidth: '40%', // 柱状图的宽度
                itemStyle: {
                    normal: {
                    color: echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: '#f76b1c' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#fad961' // 100% 处的颜色
                    }], false)
                    }
                },
                data: series
                }
            ]
        });
    }
    render() {
        return (
            <div style={{position:'relative'}}>
                <div id="mainbars" style={{width:273,height:200}}></div>
                <div className="tie">
                    <p className={[this.state.active==1?"active":null].join(' ')} onClick={()=>this.changeGon(1)}>Ua</p>
                    <p className={[this.state.active==2?"active":null].join(' ')} onClick={()=>this.changeGon(2)}>Ub</p>
                    <p className={[this.state.active==3?"active":null].join(' ')} onClick={()=>this.changeGon(3)}>Uc</p>
                    <p className={[this.state.active==4?"active":null].join(' ')} onClick={()=>this.changeGon(4)}>Ia</p>
                    <p className={[this.state.active==5?"active":null].join(' ')} onClick={()=>this.changeGon(5)}>Ib</p>
                    <p style={{borderRight:'none'}} className={[this.state.active==6?"active":null].join(' ')} onClick={()=>this.changeGon(6)}>Ic</p>
                </div>
            </div>
        );
    }
}