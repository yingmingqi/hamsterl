/* 
    单向绑定 > tag选项
*/
const QA = new QueryArgsMap().newMap({ And: {"serialstatus":"all"},Or: {},Sort: {"sort":"updatetimedesc"} })
const Hanlder = function(){}
const Hanlder2 = function(){}
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
        if (!QA.ContainsValue(thisobj.dataset.mod,thisobj.dataset.flag)){
            thisobj.classList.add('current') // 添加类标签
            let node = new el('span',{class: 'delspan'},[new el('svg',{viewBox:'0 0 24 24',class:'icon-del','aria-hidden':'true'},[new el('path',{d:'M6 6L17 17M6 17L17 6'},[])])]).render() // seleded 添加 node
            let clnode = thisobj.cloneNode(true)
            clnode.appendChild(node)
            clnode.innerHTML = clnode.innerHTML // 解决 css 不显示
            document.getElementById('selected').appendChild(clnode)
        }
        QA.pop(thisobj)
        return
    }
}
const SelectedTag = new Proxy(Hanlder,ProxyHanlder)
const SelectedTag2 = new Proxy(Hanlder2,ProxyHanlder2)