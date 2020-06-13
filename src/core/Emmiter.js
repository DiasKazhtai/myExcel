export class Emmiter {
    constructor(){
        this.listeners = {}
    }
    
    //dispatche, fire, trigger
    //Увеодмляем слушателей, если они есть
    emit(event, ...args){
        if(Array.isArray(this.listeners[event])){
            this.listeners[event].forEach(listener=>{
                listener(...args)
            })
        }
        
    }

    //on, listen
    //Подписываемся на уведомления
    //Добвляем нового слушателя
    subscribe(event, fn){
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
