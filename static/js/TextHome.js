class Queryer {
    #queryString = "";
    #queryParameter = {}; // {"WritingProgress":"loading"}

    constructor() {};

    adAndParam(key,value) {}
    adOrParam(key,value) {}
    delParam(key,value) {}
}

/* 
{
    code:integer, #状态码
    message:string, #描述信息
    data:object #返回值
}
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
        let bzText = document.createTextNode(virtualDom.name+'：');
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
        for(var c in virtualDom.tags) {
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
        for(var i in tagsJson) {
            tmp.push(this.getTagDom(tagsJson[i]));
        }

        tmp.push(this.getTagDom({"name":"写作进度", "tags":["连载中","已完结"]}));

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
        var jjjs = [{"name":"标签", "tags":["五个","六个"]}, 
                    {"name":"分类", "tags":["一个","两个","三个","四个"]}]
        var s = this.Tag(jjjs)
        for(var i in s){
            document.getElementsByClassName("selector")[0].appendChild(s[i])
        }
    }
}