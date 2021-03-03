/* 
    查询参数对象
*/

class QueryArgsMap {
    constructor() {
        this.Parameter = {
            And: {},
            Or: {}
        }
        this.SetAnd = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            this.Parameter.And[k] = v;
        }
        this.SetOr = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            if (k in this.Parameter.Or) {
                if (this.Parameter.Or[k].indexOf(v) > -1) {
                    console.log(v)
                    this.Parameter.Or[k].splice(this.Parameter.Or[k].indexOf(v), 1)
                } else {
                    this.Parameter.Or[k].push(v)
                }
            } else {
                this.Parameter.Or[k] = [v]
            }
        }
        this.ContainsValue = function (mod, flag) {
            if ("and" === mod) {
                let k = flag.split(':')[0],
                    v = flag.split(':')[1];
                if (!(k in this.Parameter.And)) {
                    return false
                }
                if (!(v === this.Parameter.And[k])) {
                    return false
                }
                return true
            }
            if ("or" === mod) {
                let k = flag.split(':')[0],
                    v = flag.split(':')[1];
                if (!(k in this.Parameter.Or)) {
                    return false
                }
                if (-1 === this.Parameter.Or[k].indexOf(v)) {
                    return false
                }
                return true
            }
        }

    }

    newMap(pm) {
        this.Parameter = pm;
        return this;
    }
    pop(obj) {
        switch (obj.dataset.mod) {
            case 'and':
                this.SetAnd(obj.dataset.flag)
                break
            case 'or':
                this.SetOr(obj.dataset.flag)
                break
            default:
                break
        }
    }
}