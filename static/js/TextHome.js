/* 
    查询参数
*/
class QueryArgs {
    constructor() {
        this.Parameter = {
            AndParam: {},
            OrParam: {},
            Sort: {}
        }
        this.adAndParam = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            this.Parameter.AndParam[k] = v;
        }
        this.adOrParam = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            if (k in this.Parameter.OrParam) {
                if (this.Parameter.OrParam[k].indexOf(v) > -1) {
                    console.log(v)
                    this.Parameter.OrParam[k].splice(this.Parameter.OrParam[k].indexOf(v),1)
                }
                else {
                    this.Parameter.OrParam[k].push(v)
                }
            } else {
                this.Parameter.OrParam[k] = [v]
            }
        }
        this.changeSort = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1],
                tmp = {}
            tmp[k] = v;
            this.Parameter.Sort = tmp
        }
    };
    newObj(pm) {
        this.Parameter = pm;
        return this;
    }
    pop(obj) {
        switch (obj.dataset.mod) {
            case 'and':
                this.adAndParam(obj.dataset.flag)
                break
            case 'or':
                this.adOrParam(obj.dataset.flag)
                break
            case 'sort':
                this.changeSort(obj.dataset.flag)
                break
            default:
                break
        }
    }

}

/* 
    单向绑定 > tag选项
*/
const QA = new QueryArgs().newObj({ AndParam: {"serialstatus":"all"},OrParam: {},Sort: {"sort":"updatetimedesc"} })
const Hanlder = function(){}
const ProxyHanlder = {
    apply: function(target, thisArg, argumentsList){
        let origin = JSON.parse(JSON.stringify(QA.Parameter)) // 深拷贝
        console.log("arg list : ${argumentsList}")
        console.log(argumentsList[0].dataset.mod,argumentsList[0].dataset.flag)
        QA.pop(argumentsList[0])
        return
    }
}
const SelectedTag = new Proxy(Hanlder,ProxyHanlder)

/* 
    虚拟DOM
*/
class VElement {
    constructor(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
    render() {
        var el = document.createElement(this.tagName); // 根据tagName构建
        var props = this.props;
        for (var propName in props) { // 设置节点的DOM属性
            var propValue = props[propName];
            el.setAttribute(propName, propValue);
        }
        var children = this.children || [];
        children.forEach(function (child) {
            var childEl = (child instanceof VElement)
                ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
                : document.createTextNode(child); // 如果字符串，只构建文本节点
            el.appendChild(childEl);
        });
        return el;
    }
}
/* 
{
    code:integer, #状态码
    message:string, #描述信息
    data:object #返回值
}
*/
/* 
    function Element (tagName, props, children) {
        this.tagName = tagName
        this.props = props
        this.children = children
    }
    ul = Element('ul', {id: 'list'}, [
        el('li', {class: 'item'}, ['Item 1']),
        el('li', {class: 'item'}, ['Item 2']),
        el('li', {class: 'item'}, ['Item 3'])]
    )
    Element.prototype.render = function () {
      var el = document.createElement(this.tagName) // 根据tagName构建
      var props = this.props

      for (var propName in props) { // 设置节点的DOM属性
        var propValue = props[propName]
        el.setAttribute(propName, propValue)
      }

      var children = this.children || []

      children.forEach(function (child) {
        var childEl = (child instanceof Element)
          ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
          : document.createTextNode(child) // 如果字符串，只构建文本节点
        el.appendChild(childEl)
      })

      return el
    }
    var ulRoot = ul.render()
    document.body.appendChild(ulRoot)
*/