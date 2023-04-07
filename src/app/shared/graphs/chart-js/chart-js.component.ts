import { Component, AfterContentInit, ElementRef, Input } from '@angular/core';

import { presets } from './chart-js.presets'

declare var Chart: any;

@Component({

  selector: 'sa-chart-js',
  template: `
  <div>
  <canvas [height]="height"></canvas>
  </div>
  `,
  styles: []
})
export class ChartJsComponent implements AfterContentInit {

  @Input() public data: any;
  @Input() public option: any;
  @Input() public type: string;
  @Input() width: string = '100%';
  @Input() height: string = '100%';


  private option_animation = {
    duration: 1,
    onComplete: function () {
      var chartInstance = this.chart,
        ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function (dataset, i) {
        var meta = chartInstance.controller.getDatasetMeta(i);
        meta.data.forEach(function (bar, index) {
          var data = dataset.data[index];
          ctx.fillText(data, bar._model.x, bar._model.y - 5);
        });
      });
    }
  }
  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    System.import('chart.js').then((chartJs: any) => {
      this.render()
    })
  }

  render() {
    let ctx = this.getCtx();
    let data = this.data;

    if (data.datasets && data.datasets.length && presets[this.type] && presets[this.type].dataset) {
      data.datasets = data.datasets.map((it) => {
        return Object.assign({}, presets[this.type].dataset, it)
      })
    }

    let chart = new Chart(ctx, {
      type: this.type,
      data: data,
      options: this.option ? this.option : presets[this.type] ? presets[this.type].options : {}
    });
    chart.update();

  }

  private getCtx() {
    return this.el.nativeElement.querySelector('canvas').getContext('2d');
  }

  randomScalingFactor() {
    return Math.round(Math.random() * 100);
  };
  randomColorFactor() {
    return Math.round(Math.random() * 255);
  };
  randomColor(opacity) {
    return 'rgba(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + (opacity || '.3') + ')';
  };

}
