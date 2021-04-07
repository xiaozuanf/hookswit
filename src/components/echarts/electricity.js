import React,{useState,useEffect} from 'react';

import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
function Header(props){
    const [styl, setStyl] = useState({
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
    })
    useEffect(() => {
        init()
    },[props]);
    function init(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
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
                data: props.data.time,
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
                }
            ],
            yAxis: [
                {
                type: 'value',
                name: '用电量（kw/h）',
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
                        color: '#047ff8' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#09e3fd' // 100% 处的颜色
                    }], false)
                    }
                },
                data: props.data.data
                }
            ]
        });
    }
    return (
        <div style={{position:'relative'}}>
            <div id="main" style={{width:340,height:200}}></div>
            <div className="text-icon" style={styl.text}>
                <img src={require("../../image/echartIcon.png")} style={styl.img} alt=""/>
                <span>近六小时电量统计</span>
            </div>
        </div>
    );
}
export default Header;