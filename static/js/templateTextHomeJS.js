/* 
    单向绑定 > tag选项
*/
const QA = new QueryArgs().newObj({ And: {"serialstatus":"all"},Or: {},Sort: {"sort":"updatetimedesc"} })
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
