import React from 'react';

import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class Header extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainPies'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                {
                  name: '面积模式',
                  type: 'pie',
                  radius: [20, 70],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  labelLine: {// 设置提示线的长度
                    normal: {
                      length: 1
                    }
                  },
                  data: [
                    {value: 10, name: '用电负荷'},
                    {value: 5, name: '用电负荷'},
                    {value: 15, name: '用电负荷'},
                    {value: 25, name: '用电负荷'},
                    {value: 20, name: '线路损失'},
                    {value: 35, name: '用电负荷'},
                    {value: 30, name: '用电负荷'},
                    {value: 40, name: '供电负荷'}
                  ],
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        // 自定义颜色
                        var colorList = [
                          '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463', '#0084FC', '#FD7C0F'
                        ]
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              ]
        });
    }
    render() {
        return (
            <div>
                <div id="mainPies" style={{width:273,height:200}}></div>
            </div>
        );
    }
}