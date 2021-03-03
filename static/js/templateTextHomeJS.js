/* 
    单向绑定 > tag选项
*/
const QA = new QueryArgsMap().newMap({ And: {"serialstatus":"all"},Or: {},Sort: {"sort":"updatetimedesc"} })
const Hanlder = function(){}
const ProxyHanlder = {
    apply: function(target, thisArg, argumentsList){
        let origin = JSON.parse(JSON.stringify(QA.Parameter)) // 深拷贝
        console.log(`argumentsList is: ${argumentsList}`)
        console.log(`thisArg is: ${thisArg}`)
        console.log(`target is: ${target}`)
        let thisobj = argumentsList[0]
        console.log(`mod is: ${thisobj.dataset.mod} , flag is: ${thisobj.dataset.flag}`)
        console.log(`fathernode is: ${thisobj.parentNode}`)
        for (let node of thisobj.parentNode.children) {node.classList.remove('current')}
        thisobj.classList.add('current')
        QA.pop(thisobj)
        return
    }
}
const ProxyHanlder2 = {
    apply: function(target, thisArg, argumentsList){
        let origin = JSON.parse(JSON.stringify(QA.Parameter)) // 深拷贝
        console.log(`argumentsList is: ${argumentsList}`)
        console.log(`thisArg is: ${thisArg}`)
        console.log(`target is: ${target}`)
        let thisobj = argumentsList[0]
        console.log(`mod is: ${thisobj.dataset.mod} , flag is: ${thisobj.dataset.flag}`)
        if (QA.ContainsValue(thisobj.dataset.mod,thisobj.dataset.flag)){ thisobj.classList.remove('current') } // 改变标签状态
        QA.pop(thisobj)
        return
    }
}
const SelectedTag = new Proxy(Hanlder,ProxyHanlder)
