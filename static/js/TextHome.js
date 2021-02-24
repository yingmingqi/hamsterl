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
        switch (obj.mode) {
            case 'and':
                this.adAndParam(obj.flag)
                break
            case 'or':
                this.adOrParam(obj.flag)
                break
            case 'sort':
                this.changeSort(obj.flag)
                break
            default:
                break
        }
    }

}

/* 
    单向绑定
*/
const QA = new QueryArgs().newObj({ AndParam: {"jindu":"all"},OrParam: {},Sort: {"shijian":"jiangxu"} })
const click = new Proxy(QA.pop,{
    apply(target,thisArg,argumentsList) {
        console.log('click pop func',argumentsList)
        let origin = JSON.parse(JSON.stringify(QA.Parameter)) // 深拷贝
        // 原函数
        //target(argumentsList[0])
        QA.pop(argumentsList[0])
    }
}) //click({"title":"bbc"})

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
class DomTreeConstructor {
    constructor(json) {
        this.js = json;
    }

    getTagDom(virtualDom) {
        let kind = document.createElement('div');
        kind.className = "kind";
        let bz = document.createElement('div');
        bz.className = "bz";
        let bzText = document.createTextNode(virtualDom.name + '：');
        bz.appendChild(bzText);
        kind.appendChild(bz);
        let nr = document.createElement('div');
        nr.className = "nr";
        let current = document.createElement('a');
        current.className = "current store";
        current.href = "javascript:void(0)";
        current.categor = "0";
        let currentText = document.createTextNode('全部');
        current.appendChild(currentText);
        nr.appendChild(current);
        for (var c in virtualDom.tags) {
            let tag = virtualDom.tags[c];
            let tmp = document.createElement('a');
            tmp.className = "store";
            tmp.href = "javascript:void(0)";
            tmp.categor = tag;
            let tmpText = document.createTextNode(tag);
            tmp.appendChild(tmpText);
            nr.appendChild(tmp);
        }
        kind.appendChild(nr);

        return kind;
    }

    Tag(tagsJson) {
        // var tagsJson = [{"name":"进度", "tags":[1,2,3]}, 
        //                 {"name":"分类", "tags":[1,2,3]}];
        var tmp = []
        for (var i in tagsJson) {
            tmp.push(this.getTagDom(tagsJson[i]));
        }

        tmp.push(this.getTagDom({
            "name": "写作进度",
            "tags": ["连载中", "已完结"]
        }));

        let storeline = document.createElement('div');
        storeline.className = "storeline";
        tmp.push(storeline);

        let kind = document.createElement('div');
        kind.className = "kind";
        let bz = document.createElement('div');
        bz.className = "bz";
        let bzText = document.createTextNode('已选条件：');
        bz.appendChild(bzText);
        kind.appendChild(bz);
        let nr = document.createElement('div');
        nr.className = "nr";
        nr.id = "selectedParams";
        kind.appendChild(nr);
        tmp.push(kind);

        return tmp
    }
    TagTest() {
        var jjjs = [{
                "name": "标签",
                "tags": ["五个", "六个"]
            },
            {
                "name": "分类",
                "tags": ["一个", "两个", "三个", "四个"]
            }
        ]
        var s = this.Tag(jjjs)
        for (var i in s) {
            document.getElementsByClassName("selector")[0].appendChild(s[i])
        }
    }
}