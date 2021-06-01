/**
 * 考虑需求:
 * 后台展示Table树型结构,该Table树型结构的数据由两个接口返回再组合.
 * 1.接口A返回用户基本信息的树型结构.
 * 2.而接口B返回单个用户的补充信息[这个部分数据需要统计做大量计算,故而单个返回],并且
 *   B接口查询一次需要间隔 2s 左右.
 * 
 * 接口A的返回数据结构如下:
 * {
	"success": true,
	"message": "执行成功",
	"status": 200,
	"result": [{
		"id": "815105384195817472",
		"username": "admin",
		"children": [{
			"id": "880149474603696128",
			"username": "test01",
			"children": null
		}, {
			"id": "894818597417779200",
			"username": "root",
			"children": null
		}, {
			"id": "894860782938882048",
			"username": "SE1",
			"children": [{
				"id": "894883148578422784",
				"username": "SE2",
				"children": null
			}]
		}]
	}],
	"messageDetail": null,
	"timestamp": "1622542579861"
}
 * 
 * 
 * 接口B的返回数据结构如下:
 * {
	"success": true,
	"message": "执行成功",
	"status": 200,
	"result": {
		"rechargeCount": 97, //充值金额
		"useableAmount": 5409418.4800 //可用余额
        //....
	},
	"messageDetail": null,
	"timestamp": "1622542581639"
}
 */

//核心实现, 点击某个节点,获取到该节点的
//children数组,然后调用该方法,onsuccess 回调函数返回补充信息后的节点下的children数组的信息,
//更新children数组信息即可.

function childrenFixedData(children,onsuccess,onerror){
    var _self = this
    var pending = children.length;
    var results = [];
    if(pending === 0){
      setTimeout(onsuccess.bind(null,results),0)
      return;
    }
    children.forEach(function(user,i){
          //1. 立即执行函数,闭包引用i,获取到children里面的用户信息
          (function(i){
              setTimeout(function(){
                  let item = children[i]
                  //3接口B
                  getAction("url", { userId:item.id})
                  .then(res => {
                    const {success,result} = res
                    if(results){
                      //3.1 创建该节点下,children新的数据结构
                      let newInfo = Object.assign(item,result)
                      results[i] = newInfo;
                      pending--; //4. 计数器避免并行操作中的数据竞争,准确地指出何时所有事件会被完成,
                                 //并以适当的顺序返回完整的结果.
                      if(pending === 0){
                        onsuccess(results)
                      }
                    }
                  })
                  .catch(err => {
                    if(results){
                      results = null;
                      onerror(err);
                    }
                  })
                },2000*i); //2. 每次调用间隔2s
          })(i)
        
    })
}