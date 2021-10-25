/**
 * 想象你是在 freelancenijia.com 工作的开发者, 这是一个流行的自由职业 "忍者" 招聘网站.
 * 为客户招聘执行秘密任务的 "忍者". 你的任务是实现一个功能, 用于让用户了解由最受欢迎的 "忍者"
 * 完成任务的任务详情. 将"忍者",任务摘要以及任务详情的数据存储展示在远程服务器上,并以JSON格式编码.
 * 你需要编写类似下面的代码: 
 * 
 * try {
 *    var ninjas = syncGetJSON("ninjas.json");
 *    var missions = syncGetJSON(ninjas[0].missionUrl);
 *    var missionDetails = syncGetJSON(missions[0].detailsUrl);
 *    //Study the mission description
 * 
 * } catch(e){
 *   // Oh no, we weren't able to get the mission details
 * }
 * 
 * 这段代码很容易理解, 如果其中任何一步出了错误, catch代码块都能很轻易地捕捉. 但很不幸,这样的代码
 * 有很大问题. 从服务器中获取数据是一个长时间操作, 而JavaScript依赖于单线程执行模型, 所以一直到长
 * 时间的操作结束之前, UI的渲染都会暂停. 随后的应用都会无响应,用户会感到不满. 我们可以用回调函数
 * 解决这个问题,这样每个任务结束后都调用回调函数,从而不会导致 UI 暂停.
 * 
 * getJSON("ninjas.json",function(err,ninjas){
 *    if(err){
 *       console.log("Error fetching list of ninjas",err);
 *       return;
 *    }
 *    getJSON(ninjas[0].missionUrl,function(err,missions){
 *       if(err){
 *          console.log("Error locating ninja missions",err);
 *          return;
 *       }
 *       getJSON(missions[0].detailsUrl,function(err,missionDetails){
 *          if(err){
 *              console.log("Error locating mission details",err);
 *              return;
 *          }
 *          //Study the intel plan
 *       });
 *    });
 * });
 * 
 * 尽管这段代码能够显著地提升用户体验, 但你也会认同这段代码写得很散乱, 其中包含着大量的错误
 * 处理样板代码, 这样的写法看起来很丑陋.  这就是生成器函数和promise大显身手的时候了. 引入
 * 这两种技术后, 非阻塞但却丑陋的回调函数代码就会变得更优雅: 
 * 
 * //通过在function关键字后增加一个 * 号可以定义生成器函数. 在生成器函数中可以使用新的 yield 关键字
 * async(function*(){
 *    try{
 *       const ninjas = yield getJSON("ninjas.json");
 *       const missions = yield getJSON(ninjas[0].missionsUrl);
 *       const missionDescription = yield getJSON(missions[0].detailsUrl);
 *       //promise对象都隐含在于 getJSON 方法中
 *       //Study the mission details
 *    }catch(e){
 *    }
 * });
 * 
 */