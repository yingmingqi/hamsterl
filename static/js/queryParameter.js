/* 
    查询参数对象
*/
class QueryArgs {
    constructor() {
        this.Parameter = {
            And: {},
            Or: {},
            Sort: {}
        }
        this.adAndParam = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            this.Parameter.And[k] = v;
        }
        this.adOrParam = function (flag) {
            let k = flag.split(':')[0],
                v = flag.split(':')[1];
            if (k in this.Parameter.Or) {
                if (this.Parameter.Or[k].indexOf(v) > -1) {
                    console.log(v)
                    this.Parameter.Or[k].splice(this.Parameter.Or[k].indexOf(v),1)
                }
                else {
                    this.Parameter.Or[k].push(v)
                }
            } else {
                this.Parameter.Or[k] = [v]
            }
        }
        this.delOrParam = function (flag) {
            this.adOrParam(flag);
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
            case 'del':
                this.delOrParam(obj.dataset.flag)
            default:
                break
        }
    }

}
