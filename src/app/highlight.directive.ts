import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]' // 方括号([])表示它的属性型选择器。 Angular 会在模板中定位每个拥有名叫 appHighlight 属性的元素，并且为这些元素加上本指令的逻辑。
})
// 该指令的控制器类
export class HighlightDirective {

  // 使用 ElementRef 来注入宿主 DOM 元素的引用，也就是你放置 appHighlight 的那个元素
  constructor(private el: ElementRef) { // 为什么此处必须加修饰符？？
      // el.nativeElement.style.backgroundColor = 'yellow';
  }

  // 它之所以称为输入属性，是因为数据流是从绑定表达式流向指令内部的。 如果没有这个元数据，Angular 就会拒绝绑定
  // 指定 highlightColor 的别名 appHighlight; 在指令内部，该属性叫 highlightColor，在外部，你绑定到它地方，它叫 appHighligh
  @Input('appHighlight') highlightColor: string;
  @Input() defaultColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

