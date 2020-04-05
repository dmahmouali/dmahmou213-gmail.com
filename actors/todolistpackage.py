
from Jumpscale import j
import json
import redis
import datetime

#TODO change name todolist 
class todolistpackage(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.model = self.bcdb.model_get(url="mybot.todolist.task.1")
    
    #_r = j.clients.redis.get()

    @j.baseclasses.actor_method
    def task_list(self ,schema_out=None, user_session=None):
        """
        ```out
            list_tasks = (L)
        ```
        """
        #use hash table or dic to reprsent each todo items 
        # tasks_result = self._r.lrange('td' ,start,end)
        # str_tasks = [ task.decode() for task in tasks_result]
        # print(str_tasks)
        # return json.dumps({'tasks': str_tasks})
        items = []
        for item in self.model.iterate():
            items.append({
            "id": item.id,
            "task": item.task,
            "time_created":item.time_created,
            "completed":False
        })
        return j.data.serializers.json.dumps(items)

    @j.baseclasses.actor_method
    def task_add(self, task ,schema_out=None, user_session=None):
        """
        ```in
        task = (S)
        ```
        """
        # self._r.rpush('td' ,task)
        item = self.model.new()
        item.task = task
        t = datetime.datetime.now()
        item.time_created = "%s/%s/%s %s:%s" % (t.day, t.month, t.year, t.hour, t.minute) 
        item = self.model.set(item)
        return json.dumps({"id":item.id,"task":item.task,"time_created":item.time_created})

    def task_delete(self, task_id="" ,schema_out=None, user_session=None):
        """
        ```in
        task_id = (I)
        ```
        """
        # res = self._r.lrem('td' ,0,task)
        # return json.dumps({'data': res})
        item_id = int(task_id)
        item = self.model.get(task_id)
        item.delete()
        

    def ports_get(self, schema_out=None, user_session=None):
        """
        ```in
        task = (S)
        ```
        """
        res = j.sal.nettools.getRunningPorts()
        return json.dumps({'data': res})
    