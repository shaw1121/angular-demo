import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name-child',
  template: `
    <h3>"{{name}}"</h3>
  `,
  styleUrls: ['./name-child.component.scss']
})
export class NameChildComponent {
  private _name = '';

  // 使用一个输入属性的 setter，以拦截父组件中值的变化，并采取行动。
  // 子组件 NameChildComponent 的输入属性 name 上的这个 setter，会 trim 掉名字里的空格，并把空值替换成默认字符串。
  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name(): string {
    return this._name;
  }

}
