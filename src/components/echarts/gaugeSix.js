import React from 'react';

import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/gauge';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class Header extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('maingauge3'));
        // 绘制图表
        myChart.setOption({
            series: [
                {
                  type: 'gauge',
                  radius: '70%',
                  axisLabel: {
                    textStyle: {
                      color: '#B3B2B2',
                      fontSize: '10'// 字体大小
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: [[0.2, '#85ff00'], [0.8, '#09E1FD'], [1, '#db3114']],
                      width: 20 // 这个是修改宽度的属性
                    }
                  },
                  splitLine: {// 大刻度
                    length: 20,
                    show: true,
                    lineStyle: {
                      color: '#fff',
                      width: 1
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#08cffc'// 指针颜色
                    }
                  },
                  pointer: {
                    width: 4, // 指针的宽度
                    length: '50%' // 指针长度，按照半圆半径的百分比
                  },
                  axisTick: {// 小刻度线
                    show: false
                  },
                  min: 0,
                  max: 100,
                  splitNumber: 10, // 设置间隔区域的显示数量
                  detail: {// 显示
                    formatter: '{value}%',
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    offsetCenter: ['0px', '20px']
                  },
                  data: [{value: 10.54}]
                }
              ]
        });
    }
    render() {
        return (
            <div>
                <div id="maingauge3" style={{width:273,height:200}}></div>
            </div>
        );
    }
}